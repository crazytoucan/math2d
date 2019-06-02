#! /bin/sh
typedoc  \
  --json docs/_data/typedoc_out.json \
  --excludeExternals \
  --excludePrivate \
  --externalPattern 'src/+(internal|__test__)/**/*.ts' \
  --mode file \
  --entryPoint 'index' \
  --excludeNotExported
