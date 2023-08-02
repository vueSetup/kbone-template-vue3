import { defineComponent, ref, watchEffect } from 'vue'

export const Input = defineComponent({
  inheritAttrs: false,
  props: {
    modelValue: [String, Number]
  },
  emits: ['update:modelValue'],
  setup(props, { emit, attrs }) {
    const modelValue = ref<string | number>(props.modelValue || '')

    watchEffect(() => {
      emit('update:modelValue', modelValue.value)
    })

    return () => {
      const classNames = ['weui-input']

      return (
        <div>
          <input class={classNames} v-model={modelValue.value} {...attrs} />
        </div>
      )
    }
  }
})
