import { after, append, attr, isTag, isVoidElement, noop, remove, toFloat } from 'uikit-util';

export default {
    args: 'src',

    props: {
        width: Number,
        height: Number,
        ratio: Number,
    },

    data: {
        ratio: 1,
    },

    connected() {
        // console.log('this', this);
        this.svg = this.getSvg().then((el) => {
            if (!this._connected) {
                return;
            }

            const svg = insertSVG(el, this.$el);

            if (this.svgEl && svg !== this.svgEl) {
                remove(this.svgEl);
            }

            applyWidthAndHeight.call(this, svg, el);

            return (this.svgEl = svg);
        }, noop);
    },

    disconnected() {
        this.svg.then((svg) => {
            if (this._connected) {
                return;
            }

            if (isVoidElement(this.$el)) {
                this.$el.hidden = false;
            }

            remove(svg);
            this.svgEl = null;
        });

        this.svg = null;
    },

    methods: {
        async getSvg() {},
    },
};

function insertSVG(el, root) {
    if (isVoidElement(root) || isTag(root, 'canvas')) {
        root.hidden = true;

        const next = root.nextElementSibling;
        return equals(el, next) ? next : after(root, el);
    }

    const last = root.lastElementChild;
    return equals(el, last) ? last : append(root, el);
}

function equals(el, other) {
    return isTag(el, 'svg') && isTag(other, 'svg') && el.innerHTML === other.innerHTML;
}

function applyWidthAndHeight(el, ref) {
    const props = ['width', 'height'];
    let dimensions = props.map((prop) => this[prop]);

    if (!dimensions.some((val) => val)) {
        dimensions = props.map((prop) => attr(ref, prop));
    }

    const viewBox = attr(ref, 'viewBox');
    if (viewBox && !dimensions.some((val) => val)) {
        dimensions = viewBox.split(' ').slice(2);
    }
    // console.log('thisthis', this);
    // console.log('dimensions', dimensions);
    // console.log('this.width', this.width);
    dimensions.forEach((val, i) => attr(el, props[i], toFloat(val) * this.ratio || null));
}
