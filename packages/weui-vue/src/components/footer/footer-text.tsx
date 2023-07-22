import type { FunctionalComponent } from "vue"

/**
 * paragraph wrapper for footer
 */
export const FooterText: FunctionalComponent = (props, { slots }) => {
  const classNames = ["weui-footer__text"]
  const children = slots.default?.()
  return <p class={classNames}>{children}</p>
}
