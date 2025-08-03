export const useForm = <T extends Record<string, any>>(initialState: T) => {
  const form = ref<T>({...initialState})
  const reset = () => {
    form.value = {...initialState}
  }

  return {form, reset}
}
