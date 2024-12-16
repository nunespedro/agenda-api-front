<template>
  <q-page padding>
    <q-form @submit="onSubmit" class="row q-col-gutter-sm">
      <q-input
        outlined
        v-model="form.name"
        label="Nome"
        class="col-lg-6 col-xs-12"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório']"
      />
      <q-input
        outlined
        v-model="form.email"
        label="Email"
        class="col-lg-6 col-xs-12"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório']"
      />
      <q-input outlined v-model="form.phone" label="Telefone" class="col-lg-6 col-xs-12" />

      <div class="col-12 q-gutter-sm">
        <q-btn label="Salvar" color="primary" class="float-left" icon="save" type="submit" />
        <q-btn
          label="Cancelar"
          color="white"
          class="float-left"
          text-color="primary"
          :to="{ name: 'home' }"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import contactsService from 'src/services/contacts'
import { useQuasar } from 'quasar'
import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
  name: 'FormPost',
  setup() {
    const { post, getById, update } = contactsService()
    const $q = useQuasar()
    const router = useRouter()
    const route = useRoute()
    const form = ref({
      name: '',
      email: '',
      phone: '',
    })

    onMounted(() => {
      if (route.params.id) {
        getContact(route.params.id)
      }
    })

    const getContact = async (id) => {
      try {
        const response = await getById(id)
        form.value = response
      } catch (error) {
        console.error(error)
      }
    }

    const onSubmit = async () => {
      try {
        if (form.value.id) {
          await update(form.value)
          $q.notify({
            message: 'Contato atualizado com sucesso.',
            icon: 'check',
            color: 'positive',
          })
        } else {
          await post(form.value)
          $q.notify({ message: 'Contato criado com sucesso.', icon: 'check', color: 'positive' })
        }
        router.push({ name: 'home' })
      } catch (error) {
        console.error(error)
      }
    }

    return {
      form,
      onSubmit,
    }
  },
})
</script>
