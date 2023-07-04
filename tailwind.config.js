/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './src/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        extend: {
            fontFamily: {
                default: 'Poppins, sans-serif, -apple-system',
            },

            textColor: {
                'system-primary': 'var(--text-system-primary)' /* New Design */,
                'system-secondary': 'var(--text-system-secondary)' /* New Design */,
                'system-tertiary': 'var(--text-system-tertiary)' /* New Design */,
                'system-placeholder': 'var(--text-system-placeholder)' /* New Design */,
                'system-primary-inverse': 'var(--text-system-primary-inverse)',
                'system-highlight': 'var(--system-highlight)' /* New Design */,
                'me-gold': '#BE8B60',
                'ms-teams-primary': '#5b5fc7',
                'ms-outlook-primary': '#27a8ea',
                'input-with-bottom-result-modal': 'var(--text-input-with-bottom-result-modal)',
            },

            backgroundColor: {
                'system-primary': 'var(--bg-system-primary)' /* New Design */,
                'system-highlight': 'var(--system-highlight)' /* New Design */,
                'system-hover-highlight': 'var(--system-hover-highlight)' /* New Design */,
                'system-alpha': 'var(--bg-system-alpha)' /* New Design */,
                'system-card-highlight': 'var(--bg-system-card-highlight)' /* New Design */,
                'system-header': 'var(--bg-system-header)' /* New Design */,
                'system-data-table-pagination': 'var(--bg-system-data-table-pagination)' /* New Design */,
                'system-sidebar': 'var(--bg-system-sidebar)' /* New Design */,
                'system-main-content': 'var(--bg-system-main-content)' /* New Design */,
                'system-data-table-odd': 'var(--bg-system-data-table-odd)' /* New Design */,
                'system-data-table-even': 'var(--bg-system-data-table-even)' /* New Design */,
                'system-surface': 'var(--bg-system-surface)' /* New Design */,

                'system-dark-alpha-10': 'var(--bg-system-dark-alpha-10)',
                'system-dark-alpha-20': 'var(--bg-system-dark-alpha-20)',
                'system-dark-alpha-30': 'var(--bg-system-dark-alpha-30)',
                'system-dark-alpha-40': 'var(--bg-system-dark-alpha-40)',
                'system-dark-alpha-50': 'var(--bg-system-dark-alpha-50)',
                'system-dark-alpha-60': 'var(--bg-system-dark-alpha-60)',
                'system-dark-alpha-70': 'var(--bg-system-dark-alpha-70)',
                'system-dark-alpha-80': 'var(--bg-system-dark-alpha-80)',
                'system-dark-alpha-90': 'var(--bg-system-dark-alpha-90)',
                'system-dark-alpha-100': 'var(--bg-system-dark-alpha-100)',

                'input-with-bottom-result-modal-selected': 'var(--bg-input-with-bottom-result-modal-selected)',
                'ms-teams-primary': '#5b5fc7',
                'ms-outlook-primary': '#27a8ea',
            },

            borderRadius: {
                'system-default': 'var(--rounded-system-default)',
            },

            backgroundImage: {
                'system-theme-image': 'var(--theme-background-url)',
            },

            borderColor: {
                'system-default': '#E3E5E8',
                'system-primary': 'var(--system-primary)' /* New Design */,
                'system-secondary': 'var(--text-system-secondary)' /* New Design */,
                'system-tertiary': 'var(--text-system-tertiary)' /* New Design */,
                'system-highlight': 'var(--system-highlight)' /* New Design */,
                'system-bg-main-content': 'var(--bg-system-main-content)' /* New Design */,
            },

            keyframes: {
                shake: {
                    '0%': { transform: 'translate(1.25rem)' },
                    '20%': { transform: 'translate(-1.25rem)' },
                    '40%': { transform: 'translate(0.625rem)' },
                    '60%': { transform: 'translate(-0.625rem)' },
                    '80%': { transform: 'translate(0.2rem)' },
                    '100%': { transform: 'translate(0rem)' },
                },
            },

            animation: {
                shake: 'shake 0.4s 1 linear',
            },
        },
    },
    plugins: [],
};
