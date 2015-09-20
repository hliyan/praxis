/**
 * A global, singleton repository of styles
 */
class Styles {
    constructor() {
        this.styles = {};
        this.styles['test'] = {
            input: {
                label: {
                    marginLeft: '0.5em',
                    marginRight: '3em',
                    fontFamily: 'sans-serif',
                    color: '#bbb'
                },
                input: {
                    margin: '0.5em',
                    padding: '0.5em'
                }
            }
        };

        this.set('test');
    }

    set(theme) {
        this.styles['active'] = this.styles[theme];
    }

    get(style) {
        return this.styles['active'][style];
    }
}

export default new Styles();