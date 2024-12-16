import useApi from 'src/composables/UseApi'

export default function contactService() {
  const { list, post, update, remove, getById } = useApi('contact')

  return {
    list,
    post,
    update,
    remove,
    getById,
  }
}
