# RAG Pipeline (Planned)

Initial design:

1. Source docs in S3
2. Chunking + metadata extraction
3. Embedding generation job
4. Vector index upsert
5. Query Lambda with citation return

Minimum demo target:

- AWS certification content corpus
- Answer with citation chunks
- Basic quality evaluation report
