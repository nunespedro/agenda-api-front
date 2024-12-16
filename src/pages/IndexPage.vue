<template>
  <q-page padding>
    <q-table title="Contatos" :rows="contact" :columns="columns" row-key="name">
      <template v-slot:top>
        <span class="text-h5">Contatos</span>
        <q-space />
        <q-btn color="primary" label="Novo" :to="{ name: 'formContact' }" />
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props" class="q-gutter-sm">
          <q-btn
            icon="edit"
            color="info"
            dense
            size="sm"
            @click="handleEditContact(props.row.id)"
          />
          <q-btn
            icon="delete"
            color="negative"
            dense
            size="sm"
            @click="handleDeleteContact(props.row.id)"
          />
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import contactsService from 'src/services/contacts'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'IndexPage',
  setup() {
    const contact = ref([])
    const { list, remove } = contactsService()
    const router = useRouter()
    const columns = [
      { name: 'id', field: 'id', align: 'left', label: 'Id', sortable: true },
      { name: 'name', field: 'name', align: 'left', label: 'Nome', sortable: true },
      { name: 'email', field: 'email', align: 'left', label: 'Email', sortable: true },
      { name: 'phone', field: 'phone', align: 'left', label: 'Telefone', sortable: true },
      { name: 'actions', field: 'actions', align: 'right', label: 'Ações', sortable: true },
    ]
    const $q = useQuasar()

    onMounted(() => {
      getContacts()
    })

    const getContacts = async () => {
      try {
        const data = await list()
        contact.value = data
      } catch (error) {
        console.error(error)
      }
    }

    const handleDeleteContact = async (id) => {
      try {
        $q.dialog({
          title: 'Remover',
          message: 'Deseja remover o contato?',
          cancel: true,
          persistent: true,
        }).onOk(async () => {
          await remove(id)
          $q.notify({ message: 'Contato removido com sucesso.', icon: 'check', color: 'positive' })
          await getContacts()
        })
      } catch {
        $q.notify({
          message: 'Não foi possível remover o contato.',
          icon: 'times',
          color: 'negative',
        })
      }
    }

    const handleEditContact = (id) => {
      router.push({ name: 'formContact', params: { id } })
    }

    return {
      contact,
      columns,
      handleDeleteContact,
      handleEditContact,
    }
  },
})
</script>
