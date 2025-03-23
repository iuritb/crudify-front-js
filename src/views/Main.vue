<template>
  <v-container class="main-page-container">
    <div class="main-page-container__header">
      <h1 class="main-page-container__tittle">List Users</h1>
      <v-btn
        class="main-page-container__insert-button mb-4"
        color="primary"
        @click="openCreateModal"
      >
        Insert user
      </v-btn>
    </div>

    <dynamic-table :items="users" :headers="tableHeaders">
      <template #actions="{ item }">
        <v-icon
          color="green"
          class="dynamic-table__action-icon"
          @click="openEditModal(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          color="red"
          class="dynamic-table__action-icon"
          @click="confirmDelete(item)"
        >
          mdi-delete
        </v-icon>
      </template>
    </dynamic-table>
  </v-container>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from 'vue-router'

import userService from "../services/userService";
import DynamicTable from "../components/ui/dynamicTable.vue";

export default {
  name: "Main",
  components: { DynamicTable },
  setup() {
    const router = useRouter()
    const users = ref([]);
    const dialogVisible = ref(false);
    const selectedUser = ref(null);

    const formatDate = (timestamp) => {
      const date = new Date(timestamp * 1000);
      const pad = (num) => num.toString().padStart(2, "0");
      return `${pad(date.getMonth() + 1)}/${pad(
        date.getDate()
      )}/${date.getFullYear()} ${pad(date.getHours())}:${pad(
        date.getMinutes()
      )}:${pad(date.getSeconds())}`;
    };

    const tableHeaders = [
      { field: "username", label: "Username", sortable: true },
      {
        field: "roles",
        label: "Roles",
        render: (item) =>
          Array.isArray(item.roles) ? item.roles.join(", ") : item.roles,
      },
      { field: "preferences.timezone", label: "Timezone" },
      {
        field: "active",
        label: "Is Active?",
        render: (item) => (item.active ? "Yes" : "No"),
      },
      {
        field: "updated_ts",
        label: "Last Updated At",
        render: (item) => formatDate(item.updated_ts),
      },
      {
        field: "created_ts",
        label: "Created At",
        render: (item) => formatDate(item.created_ts),
      },
    ];

    const fetchUsers = async () => {
      try {
        const response = await userService.listUsers();
        users.value = Array.isArray(response.data)
          ? response.data
          : response.data.users || [];
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };

    const openCreateModal = () => {
      router.push({ name: 'UserPage' })
    }

    const openEditModal = (user) => {
      router.push({ name: 'UserPage', params: { id: user._id, user: user } })
    }

     const confirmDelete = async (user) => {
      if (confirm(`Are you sure you want to delete the user ${user.username}?`)) {
        try {
          await userService.deleteUser(user._id)
          fetchUsers()
        } catch (error) {
          console.error('Error deleting user:', error)
        }
      }
    }

    onMounted(fetchUsers);

    return {
      users,
      tableHeaders,
      openCreateModal,
      openEditModal,
      confirmDelete
    };
  },
};
</script>

<style lang="scss" scoped>
.main-page-container {
  &__header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 12px;
  }
}
</style>
