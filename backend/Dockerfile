# ════════════════════════════════════════════════════════════════
#  Backend — Python 3.10 Slim
#  Uses slim variant (~45 MB less than full python:3.10)
# ════════════════════════════════════════════════════════════════
FROM python:3.10-slim

WORKDIR /app

# System deps for psycopg2 (C extension)
RUN apt-get update \
 && apt-get install -y --no-install-recommends libpq-dev gcc \
 && rm -rf /var/lib/apt/lists/*

# Layer-cache: install deps before copying app code
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

EXPOSE 5000

# Run seed then start Uvicorn
CMD ["sh", "-c", "python app/seed.py && uvicorn app.main:app --host 0.0.0.0 --port 5000"]