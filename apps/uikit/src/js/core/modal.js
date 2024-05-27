import {
    $,
    addClass,
    assign,
    css,
    hasClass,
    height,
    html, isObject,
    isString,
    isTag,
    noop,
    on,
    removeClass,
} from 'uikit-util';
import Modal from '../mixin/modal';

export default {
    install,

    mixins: [Modal],

    data: {
        clsPage: 'uk-modal-page',
        selPanel: '.uk-modal-dialog',
        selClose:
            '.uk-modal-close, .uk-modal-close-default, .uk-modal-close-outside, .uk-modal-close-full',
    },

    events: [
        {
            name: 'fullscreenchange webkitendfullscreen',

            capture: true,

            handler(e) {
                if (isTag(e.target, 'video') && this.isToggled() && !document.fullscreenElement) {
                    this.hide();
                }
            },
        },

        {
            name: 'show',

            self: true,

            handler() {
                if (hasClass(this.panel, 'uk-margin-auto-vertical')) {
                    addClass(this.$el, 'uk-flex');
                } else {
                    css(this.$el, 'display', 'flex');
                }

                height(this.$el); // force reflow
            },
        },

        {
            name: 'hidden',

            self: true,

            handler() {
                css(this.$el, 'display', '');
                removeClass(this.$el, 'uk-flex');
            },
        },
    ],
};

function install({ modal }) {
    modal.dialog = function (content, options) {
        const dialog = modal($(`<div><div class="uk-modal-dialog">${content}</div></div>`), {
            stack: true,
            role: 'alertdialog',
            ...options,
        });

        dialog.show();

        on(
            dialog.$el,
            'hidden',
            async () => {
                await Promise.resolve();
                dialog.$destroy(true);
            },
            { self: true },
        );

        return dialog;
    };

    modal.alert = function (options) {
        return openDialog(
            ({ i18n }) => `<div class="uk-dialog-body">
                    <p class="uk-dialog-title">${options?.title || ''}</p>
                    <p class="uk-dialog-text">${typeof options ==='string' ? html(options) ||'' : options?.text ||''}</p>
                </div>
                <div class="uk-dialog-footer">
                    <button class="btn btn-fill btn-primary btn-lg uk-modal-close" autofocus>${options?.confirmButtonText || i18n.ok}</button>
                </div>`,
            options,
        );
    };

    modal.confirm = function (options) {
        return openDialog(
            ({ i18n }) => `<form>
                <div class="uk-dialog-body">
                    <p class="uk-dialog-title">${options?.title}</p>
                    <p class="uk-dialog-text">${isObject(options) ? options?.text || '' : html(options) || ''}</p>
                </div>
                <div class="uk-dialog-footer">
                    <button class="btn btn-tonal btn-dark btn-lg uk-modal-close">${
                        options?.cancelButtonText || i18n.cancel
                    }</button>
                    <button class="btn btn-fill btn-primary btn-lg" autofocus>${options?.confirmButtonText || i18n.ok}</button>
                </div>
            </form>`,
            options,
            () => Promise.reject(),
        );
    };

    modal.prompt = function (message, value, options) {
        const promise = openDialog(
            ({ i18n }) => `<form class="uk-form-stacked">
                <div class="uk-modal-body">
                    <label>${isString(message) ? message : html(message)}</label>
                    <input class="uk-input" autofocus>
                </div>
                <div class="uk-modal-footer uk-text-right">
                    <button class="uk-button uk-button-default uk-modal-close" type="button">${
                        i18n.cancel
                    }</button>
                    <button class="uk-button uk-button-primary">${i18n.ok}</button>
                </div>
            </form>`,
            options,
            () => null,
            () => input.value,
        );

        const { $el } = promise.dialog;
        const input = $('input', $el);
        input.value = value || '';
        on($el, 'show', () => input.select());

        return promise;
    };

    modal.i18n = {
        ok: '확인',
        cancel: '취소',
    };

    function openDialog(tmpl, options, hideFn = noop, submitFn = noop) {
        options = {
            bgClose: false,
            escClose: true,
            ...options,
            i18n: { ...modal.i18n, ...options?.i18n },
        };

        const dialog = modal.dialog(tmpl(options), options);

        return assign(
            new Promise((resolve) => {
                const off = on(dialog.$el, 'hide', () => resolve(hideFn()));

                on(dialog.$el, 'submit', 'form', (e) => {
                    e.preventDefault();
                    resolve(submitFn(dialog));
                    off();
                    dialog.hide();
                });
            }),
            { dialog },
        );
    }
}
