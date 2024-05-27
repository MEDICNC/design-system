import esbuild from 'esbuild';
import postcss from 'esbuild-postcss'
import  path from 'path'

esbuild
    .build({
        entryPoints: ['dist/css/cva.css'],
        bundle: true,
        outdir: 'cva',
        plugins: [postcss({
            plugins: {
                'postcss-cva': {},
            },
        })],
    })
    .catch(() => process.exit(1));