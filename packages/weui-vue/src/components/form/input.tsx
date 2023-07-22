import { defineComponent, ref, watchEffect } from 'vue'

export const Input = defineComponent({
  props: {
    modelValue: String
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const modelValue = ref<string>(props.modelValue || '')

    watchEffect(() => {
      emit('update:modelValue', modelValue.value)
    })

    return () => {
      const classNames = ['weui-input']

      return (
        <div>
          <input class={classNames} v-model={modelValue.value} />
        </div>
      )
    }
  }
})
