import type { Config } from 'tailwindcss';

/**
 * Base Tailwind CSS configuration for userscripts
 * Provides a shared configuration that can be extended by individual userscript projects
 */
export const baseConfig: Partial<Config> = {
  content: [
    // Default content paths - projects should extend this
    './src/**/*.{html,js,ts,jsx,tsx,vue}',
  ] as string[],
  theme: {
    extend: {
      // Custom colors for userscripts
      colors: {
        userscript: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        overlay: {
          light: 'rgba(255, 255, 255, 0.9)',
          dark: 'rgba(0, 0, 0, 0.8)',
          backdrop: 'rgba(0, 0, 0, 0.5)',
        }
      },
      // Animation utilities for userscripts
      animation: {
        'fade-in': 'fadeIn 0.2s ease-in-out',
        'fade-out': 'fadeOut 0.2s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'slide-out': 'slideOut 0.3s ease-in',
        'bounce-in': 'bounceIn 0.4s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        slideIn: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideOut: {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(100%)', opacity: '0' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      // Z-index utilities for layering userscript elements
      zIndex: {
        'userscript': '999999',
        'userscript-modal': '1000000',
        'userscript-tooltip': '1000001',
        'userscript-overlay': '1000002',
      },
      // Font sizes optimized for userscript UI
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
      },
      // Spacing values useful for compact userscript interfaces
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      // Border radius for modern UI elements
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      }
    },
  },
  plugins: [],
};

/**
 * Creates a complete Tailwind configuration by merging the base config with project-specific overrides
 */
export function createTailwindConfig(overrides: Partial<Config> = {}): Config {
  const baseContent = Array.isArray(baseConfig.content) ? baseConfig.content : [];
  const overrideContent = Array.isArray(overrides.content) ? overrides.content : [];
  
  return {
    ...baseConfig,
    ...overrides,
    content: [
      ...baseContent,
      ...overrideContent,
    ],
    theme: {
      ...baseConfig.theme,
      ...overrides.theme,
      extend: {
        ...baseConfig.theme?.extend,
        ...overrides.theme?.extend,
      },
    },
    plugins: [
      ...(baseConfig.plugins || []),
      ...(overrides.plugins || []),
    ],
  } as Config;
}

/**
 * Preset configurations for common userscript scenarios
 */
export const presets = {
  /**
   * Minimal configuration for simple userscripts
   */
  minimal: createTailwindConfig({
    theme: {
      extend: {
        colors: {
          primary: {
            50: '#f0f9ff',
            100: '#e0f2fe',
            200: '#bae6fd',
            300: '#7dd3fc',
            400: '#38bdf8',
            500: '#0ea5e9',
            600: '#0284c7',
            700: '#0369a1',
            800: '#075985',
            900: '#0c4a6e',
            950: '#082f49',
          },
        }
      }
    }
  }),

  /**
   * Configuration optimized for modal/overlay userscripts
   */
  modal: createTailwindConfig({
    theme: {
      extend: {
        backdropBlur: {
          xs: '2px',
        }
      }
    }
  }),

  /**
   * Configuration for userscripts that need to blend with existing page styles
   */
  stealth: {
    ...createTailwindConfig(),
    corePlugins: {
      preflight: false, // Disable Tailwind's CSS reset
    }
  } as Config,
};

/**
 * Utility function to generate scoped CSS classes for userscripts
 * Helps avoid conflicts with existing page styles
 */
export function scopedClasses(scope: string = 'userscript') {
  return {
    prefix: `${scope}-`,
    important: `#${scope}`,
  };
}
