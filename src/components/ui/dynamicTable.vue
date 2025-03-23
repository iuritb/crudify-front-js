<template>
  <v-table class="dynamic-table">
    <thead>
      <tr>
        <th
          v-for="header in props.headers"
          :key="header.field"
          class="text-left dynamic-table__header-cell"
        >
          {{ header.label }}
        </th>
        <th v-if="$slots.actions" class="text-left dynamic-table__header-cell">
          Actions
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in props.items" :key="item._id || index">
        <td v-for="header in props.headers" :key="header.field">
          <slot :name="header.field" :item="item">
            {{ renderCell(item, header) }}
          </slot>
        </td>
        <td v-if="$slots.actions">
          <slot name="actions" :item="item">
            <v-icon
              color="green"
              class="dynamic-table__action-icon"
              @click="editItem(item)"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              color="red"
              class="dynamic-table__action-icon"
              @click="deleteItem(item)"
            >
              mdi-delete
            </v-icon>
          </slot>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script>
import { defineComponent, toRefs } from 'vue'

export default defineComponent({
  name: 'DynamicTable',
  props: {
    items: {
      type: Array,
      default: () => []
    },
    headers: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    const { items, headers } = toRefs(props)

    const renderCell = (item, header) => {
      if (typeof header.render === 'function') {
        return header.render(item)
      } else {
        const keys = header.field.split('.')
        return keys.reduce((acc, key) => (acc ? acc[key] : ''), item)
      }
    }

    const editItem = (item) => {
      console.log('Edit:', item)
    }

    const deleteItem = (item) => {
      console.log('Delete:', item)
    }

    return {
      props,
      renderCell,
      editItem,
      deleteItem
    }
  }
})
</script>

<style lang="scss" scoped>
.dynamic-table {
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 10px;
  overflow: hidden;

  &__header-cell {
    background-color: #9c27b0;
    color: white;
    transition: background-color 0.3s;
    padding: 8px;

    &:hover {
      background-color: #ab47bc;
    }
  }

  tbody {
    tr {
      &:nth-child(odd) {
        background-color: #ffffff;
      }
      &:nth-child(even) {
        background-color: #f9f9f9;
      }
      &:hover {
        background-color: #e1bee7;
      }
    }
  }
}

.dynamic-table__action-icon {
  margin-right: 24px;
  cursor: pointer;
  vertical-align: middle;
}
</style>
