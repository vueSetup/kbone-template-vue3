import { computed, defineComponent, ref, watchEffect } from 'vue'

export const TextArea = defineComponent({
  inheritAttrs: false,
  props: {
    showCounter: Boolean,
    maxLength: Number,
    modelValue: String
  },
  emits: ['update:modelValue'],
  setup(props, { slots, attrs, emit }) {
    const modelValue = ref<string>(props.modelValue || '')

    watchEffect(() => {
      emit('update:modelValue', modelValue.value)
    })

    const textCounter = computed(() => modelValue.value.length)

    const children = slots.default?.()

    return () => {
      const classNames = ['weui-textarea']
      const { showCounter, maxLength } = props

      const counter = showCounter && (
        <div class="weui-textarea-counter">
          <span>{textCounter.value}</span>
          {maxLength ? '/' + maxLength : false}
        </div>
      )

      return (
        <div>
          <textarea maxlength={maxLength} class={classNames} v-model={modelValue.value} {...attrs}>
            {children}
          </textarea>
          {counter}
        </div>
      )
    }
  }
})
