import { defineComponent, nextTick, onBeforeUnmount, onMounted, watch } from 'vue'
import { useRoute } from 'vitepress'

function setBlockHeightVars(block: HTMLElement, pre: HTMLElement) {
  block.style.setProperty('--tm-code-collapsed-height', '0px')
  block.style.setProperty('--tm-code-expanded-height', `${pre.scrollHeight}px`)
}

function enhanceCodeBlocks() {
  const blocks = document.querySelectorAll<HTMLElement>('.vp-doc div[class*="language-"]')

  blocks.forEach((block) => {
    if (block.dataset.tmCodeToggleReady === 'true') {
      return
    }

    const pre = block.querySelector<HTMLElement>('pre')
    if (!pre) {
      return
    }

    block.dataset.tmCodeToggleReady = 'true'

    const content = document.createElement('div')
    content.className = 'tm-code-block__content'
    pre.parentNode?.insertBefore(content, pre)
    content.appendChild(pre)

    const toggle = document.createElement('button')
    toggle.type = 'button'
    toggle.className = 'tm-code-block__toggle'

    const syncLabel = (expanded: boolean) => {
      toggle.textContent = expanded ? '收起代码' : '展开代码'
      toggle.setAttribute('aria-expanded', String(expanded))
    }

    setBlockHeightVars(block, pre)
    block.classList.add('tm-code-block', 'is-collapsible', 'is-collapsed')
    syncLabel(false)

    toggle.addEventListener('click', () => {
      const willExpand = block.classList.contains('is-collapsed')
      setBlockHeightVars(block, pre)
      block.classList.toggle('is-collapsed', !willExpand)
      block.classList.toggle('is-expanded', willExpand)
      syncLabel(willExpand)
    })

    block.appendChild(toggle)
  })
}

export default defineComponent({
  name: 'CodeBlockToggle',
  setup() {
    const route = useRoute()
    let frameId = 0
    let observer: MutationObserver | null = null

    const scheduleEnhance = () => {
      cancelAnimationFrame(frameId)
      frameId = window.requestAnimationFrame(() => {
        enhanceCodeBlocks()
      })
    }

    onMounted(() => {
      nextTick(scheduleEnhance)

      observer = new MutationObserver(() => {
        scheduleEnhance()
      })

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      })
    })

    watch(
      () => route.path,
      () => {
        nextTick(scheduleEnhance)
      },
    )

    onBeforeUnmount(() => {
      cancelAnimationFrame(frameId)
      observer?.disconnect()
    })

    return () => null
  },
})
