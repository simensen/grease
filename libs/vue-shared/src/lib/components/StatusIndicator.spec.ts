import { mount } from '@vue/test-utils'
import StatusIndicator from './StatusIndicator.vue'

describe('StatusIndicator', () => {
  it('should render with required status prop', () => {
    const wrapper = mount(StatusIndicator, {
      props: { status: 'active' }
    })
    
    expect(wrapper.find('.grease-status-indicator').exists()).toBe(true)
    expect(wrapper.find('.status-dot').exists()).toBe(true)
    expect(wrapper.classes()).toContain('status-active')
  })

  it('should apply correct CSS class for each status', () => {
    const statuses = ['active', 'inactive', 'error', 'warning', 'loading'] as const
    
    statuses.forEach(status => {
      const wrapper = mount(StatusIndicator, {
        props: { status }
      })
      
      expect(wrapper.classes()).toContain(`status-${status}`)
    })
  })

  it('should render label when provided', () => {
    const wrapper = mount(StatusIndicator, {
      props: {
        status: 'active',
        label: 'System Active'
      }
    })
    
    expect(wrapper.find('.status-label').text()).toBe('System Active')
  })

  it('should not render label when not provided', () => {
    const wrapper = mount(StatusIndicator, {
      props: { status: 'active' }
    })
    
    expect(wrapper.find('.status-label').exists()).toBe(false)
  })

  it('should apply pulsing class when pulsing is true', () => {
    const wrapper = mount(StatusIndicator, {
      props: {
        status: 'loading',
        pulsing: true
      }
    })
    
    expect(wrapper.classes()).toContain('pulsing')
  })

  it('should not apply pulsing class when pulsing is false', () => {
    const wrapper = mount(StatusIndicator, {
      props: {
        status: 'loading',
        pulsing: false
      }
    })
    
    expect(wrapper.classes()).not.toContain('pulsing')
  })

  it('should have correct structure', () => {
    const wrapper = mount(StatusIndicator, {
      props: {
        status: 'active',
        label: 'Test Label'
      }
    })
    
    const indicator = wrapper.find('.grease-status-indicator')
    expect(indicator.find('.status-dot').exists()).toBe(true)
    expect(indicator.find('.status-label').exists()).toBe(true)
  })
})
