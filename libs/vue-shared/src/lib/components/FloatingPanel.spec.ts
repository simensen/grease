import { mount } from '@vue/test-utils'
import FloatingPanel from './FloatingPanel.vue'

describe('FloatingPanel', () => {
  it('should render with default props', () => {
    const wrapper = mount(FloatingPanel)
    
    expect(wrapper.find('.grease-floating-panel').exists()).toBe(true)
    expect(wrapper.find('.grease-panel-title').text()).toBe('Panel')
    expect(wrapper.find('.grease-panel-close').exists()).toBe(true)
  })

  it('should render custom title', () => {
    const wrapper = mount(FloatingPanel, {
      props: { title: 'Custom Title' }
    })
    
    expect(wrapper.find('.grease-panel-title').text()).toBe('Custom Title')
  })

  it('should hide when visible is false', () => {
    const wrapper = mount(FloatingPanel, {
      props: { visible: false }
    })
    
    expect(wrapper.find('.grease-floating-panel').exists()).toBe(false)
  })

  it('should not show close button when closable is false', () => {
    const wrapper = mount(FloatingPanel, {
      props: { closable: false }
    })
    
    expect(wrapper.find('.grease-panel-close').exists()).toBe(false)
  })

  it('should emit close event when close button is clicked', async () => {
    const wrapper = mount(FloatingPanel)
    
    await wrapper.find('.grease-panel-close').trigger('click')
    
    expect(wrapper.emitted('close')).toBeTruthy()
    expect(wrapper.emitted('close')).toHaveLength(1)
  })

  it('should render slot content', () => {
    const wrapper = mount(FloatingPanel, {
      slots: {
        default: '<p>Test content</p>'
      }
    })
    
    expect(wrapper.find('.grease-panel-content p').text()).toBe('Test content')
  })

  it('should render header slot', () => {
    const wrapper = mount(FloatingPanel, {
      slots: {
        header: '<h2>Custom Header</h2>'
      }
    })
    
    expect(wrapper.find('.grease-panel-header h2').text()).toBe('Custom Header')
  })

  it('should apply initial position', () => {
    const wrapper = mount(FloatingPanel, {
      props: {
        initialX: 100,
        initialY: 200
      }
    })
    
    const panelElement = wrapper.find('.grease-floating-panel').element as HTMLElement
    expect(panelElement.style.left).toBe('100px')
    expect(panelElement.style.top).toBe('200px')
  })

  it('should apply custom z-index', () => {
    const wrapper = mount(FloatingPanel, {
      props: { zIndex: 50000 }
    })
    
    const panelElement = wrapper.find('.grease-floating-panel').element as HTMLElement
    expect(panelElement.style.zIndex).toBe('50000')
  })

  it('should have move cursor when draggable', () => {
    const wrapper = mount(FloatingPanel, {
      props: { draggable: true }
    })
    
    const panelElement = wrapper.find('.grease-floating-panel').element as HTMLElement
    expect(panelElement.style.cursor).toBe('move')
  })

  it('should have default cursor when not draggable', () => {
    const wrapper = mount(FloatingPanel, {
      props: { draggable: false }
    })
    
    const panelElement = wrapper.find('.grease-floating-panel').element as HTMLElement
    expect(panelElement.style.cursor).toBe('default')
  })
})
