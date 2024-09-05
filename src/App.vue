<template>
  <v-data-table
    class="wrap-table"
    :headers="headers"
    :items="networks"
    v-model:page="metaData.currentPage"
    v-model:items-per-page="metaData.pageSize"
    @update:page="getNetworks"
    @update:items-per-page="getNetworks"
    :items-length="metaData.totalItems"
    :items-per-page-options="tableOptions"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template #activator="{ props }">
            <add-network-button :props="props" />
            <v-spacer></v-spacer>
          </template>

          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-container>
              <v-row>
                <v-col cols="12" w="100">
                  <v-text-field
                    v-model.number="editedItem.number"
                    :rules="numberInt"
                    label="Number"
                    type="number"

                  ></v-text-field>
                </v-col>

                <v-col cols="12" w="100">
                  <v-text-field
                    v-model="editedItem.name"
                    label="Name"
                    :rules="rulesRequired"
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    v-model.number="editedItem.frequency"
                    :rules="numberFrequency"
                    label="Частота"
                    type="number"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="editedItem.alias"
                    label="Alias"
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-textarea
                    v-model="editedItem.description"
                    label="Description"
                  ></v-textarea>
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    v-model="editedItem.features"
                    label="Features"
                  ></v-text-field>
                </v-col>

                <v-col cols="6">
                  <v-text-field
                    v-model.number="editedItem.x"
                    :rules="numberRulesX"
                    label="X"
                    type="number"
                  ></v-text-field>
                </v-col>

                <v-col cols="6">
                  <v-text-field
                    v-model.number="editedItem.y"
                    :rules="numberRulesY"
                    label="Y"
                    type="number"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>


            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue-darken-1"
                variant="text"
                @click="close"
              >
                Відмінити
              </v-btn>
              <v-btn
                color="blue-darken-1"
                variant="text"
                @click="save"
              >
                Зберегти
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <selects-component
          :name="'frequency'"
          label="Частоти"
          :itemsSelect="itemsSelectFrequency"
          @update:modelValue="updateFrequency"
          v-model="selectedFrequency"
        />
        <selects-component
          :name="'alias'"
          label="Позивні"
          :itemsSelect="itemsSelectAlias"
          @update:modelValue="updateAlias"
          v-model="selectedAlias"
        />
        <v-spacer></v-spacer>
        <search-field
          @searching="onHandleInputSearch"
        ></search-field>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Ви точно впевнені у видаленні?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Відмінити</v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">Так</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        :class="{ 'me-2': true }"
        size="small"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        size="small"
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>

<script>
import axios from 'axios'
import { tableColumn } from './helpers/column.ts'
import AddNetworkButton from '@/components/AddNetworkButton.vue'
import SelectsComponent from '@/components/SelectsComponent.vue'
import SearchField from '@/components/SearchField.vue'

export default {
  components: { SearchField, SelectsComponent, AddNetworkButton },
  data: () => ({
    search: '',
    itemsSelectAlias: [],
    itemsSelectFrequency: [],
    selectedFrequency: '',
    selectedAlias: null,
    dialog: false,
    dialogDelete: false,
    headers: tableColumn,
    networks: [],
    networksForSearch: [],
    metaData: {
      totalItems: 0,
      totalPages: 0,
      currentPage: 0,
      pageSize: 0
    },
    rulesRequired: [
      v => !!v || 'Поле обовязкове'
    ],
    numberRulesX: [
      v => Number.isInteger(v) || 'Тільки цілі числа',
      v => v <= 90 || 'Min -90, Max 90',
      v => v >= -90 || 'Min -90, Max 90'
    ],
    numberRulesY: [
      v => Number.isInteger(v) || 'Тільки цілі числа',
      v => v <= 180 || 'Min -180, Max 180',
      v => v >= -180 || 'Min -180, Max 180'
    ],
    numberFrequency: [
      v => /^\d+(\.\d{1,2})?$/.test(v) || 'Чиста з точністю до десятих'
    ],
    numberInt: [
      v => !!(v && Number.isInteger(v)) || 'Поле обовязкове та тільки цілі числа'
    ],
    tableOptions: [
      { value: 5, title: '5' },
      { value: 10, title: '10' },
      { value: 20, title: '20' },
      { value: -1, title: 'All' }
    ],
    editedIndex: -1,
    editedItem: {
      number: null,
      name: null,
      frequency: '',
      alias: '',
      description: '',
      features: '',
      x: 0,
      y: 0
    },
    defaultItem: {
      number: null,
      name: null,
      frequency: '',
      alias: '',
      description: '',
      features: '',
      x: 0,
      y: 0
    }
  }),

  mounted() {
    this.getNetworks()
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Додати Мережу' : 'Edit Item'
    }
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
    selectedFrequency(val) {
      if (val) {
        this.networks = this.networksForSearch.filter(f => f.frequency === val)
      } else this.networks = this.networksForSearch
    },
    selectedAlias(val) {
      if (val) {
        this.networks = this.networksForSearch.filter(f => f.alias === val)
      } else this.networks = this.networksForSearch
    }
  },

  methods: {
    updateFrequency(val) {
      if (val) {
        this.selectedFrequency = val
      }
    },
    updateAlias(val) {
      if (val) {
        this.selectedAlias = val
      }
    },
    onHandleInputSearch(value) {
      this.networks = this.networksForSearch.filter(f => f.name.toLowerCase().includes(value.toLowerCase()))
    },

    createOptionsSelect(data, label) {
      return [...new Set(data.map(el => el[label]))]
    },

    async getNetworks() {
      try {
        const urlToGetNetworks = this.metaData.pageSize === -1
          ? 'http://localhost:3004/networks/get'
          : `http://localhost:3004/networks/pagination?page=${this.metaData.currentPage || 1}&pageSize=${this.metaData.pageSize || 10}`
        const { data } = await axios.get(urlToGetNetworks)
        this.networks = data.data
        this.networksForSearch = data.data
        this.metaData = data.meta
        this.itemsSelectAlias = this.createOptionsSelect(data.data, 'alias')
        this.itemsSelectFrequency = this.createOptionsSelect(data.data, 'frequency')
      } catch (err) {
        console.log(err)
      }
    },

    async deleteNetwork(id) {
      try {
        const { data } = await axios.delete(`http://localhost:3004/networks/delete/${id}`)
        if (data.isSuccess) {
          this.networks = this.networks.filter(net => net.id !== id)
          this.networksForSearch = this.networks
        }
      } catch (err) {
        console.log(err)
      }
    },

    async addNetwork(body) {
      try {
        const { data } = await axios.post(`http://localhost:3004/networks/add`, body, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        if (data.isSuccess) {
          this.networks.push(data.item)
          this.networksForSearch = this.networks

        }
      } catch (error) {
        console.error('Error uploading file:', error)
      }
    },
    async updateNetwork(body) {
      try {
        const { data } = await axios.put(`http://localhost:3004/networks/update/${body.id}`, body, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        if (data.isSuccess) {
          const updatedNetwork = data.network
          const index = this.networks.findIndex(net => net.id === body.id)
          if (index !== -1) {
            this.networks.splice(index, 1, updatedNetwork)
            this.networksForSearch = this.networks

          } else {
            this.networks.push(updatedNetwork)
            this.networksForSearch = this.networks

          }
        }
      } catch (error) {
        console.error('Error updating network:', error)
      }
    },
    editItem(item) {
      this.editedIndex = this.networks.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.networks.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.deleteNetwork(this.editedItem.id)
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(this.resetEditedItem)
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(this.resetEditedItem)
    },

    save() {
      if (!this.editedItem.name && !this.editedItem.number) {
        return null
      } else {
        this.editedIndex > -1
          ? this.updateNetwork(this.editedItem)
          : this.addNetwork(this.editedItem)
        this.close()
      }
    },
    resetEditedItem() {
      this.editedItem = { ...this.defaultItem }
      this.editedIndex = -1
    }
  }
}
</script>
<style scoped>
.wrap-table {
  padding: 24px;
}
</style>
