import type { LogEntry, LogLevel } from '../types/log';

type LogListener = (logs: LogEntry[]) => void;

class LogStreamService {
  private logs: LogEntry[] = [];
  private listeners: Set<LogListener> = new Set();
  private timerId: ReturnType<typeof setInterval> | null = null;
  private isPaused = false;
  private counter = 1;

  private sampleLogTemplates: Array<{
    level: LogLevel;
    service: string;
    message: string;
    details?: Record<string, unknown> | undefined;
  }> = [
    {
      level: 'INFO',
      service: 'HTTP',
      message: 'GET /api/v1/analytics 200 OK',
      details: { statusCode: 200, durationMs: 14, ip: '127.0.0.1' },
    },
    {
      level: 'INFO',
      service: 'HTTP',
      message: 'GET /api/v1/users?page=1&limit=10 200 OK',
      details: { statusCode: 200, durationMs: 22, query: { page: 1, limit: 10 } },
    },
    {
      level: 'INFO',
      service: 'AuthService',
      message: 'JWT access token verified for user_admin_01',
      details: { userId: 'usr_8921', role: 'ADMIN' },
    },
    {
      level: 'INFO',
      service: 'DatabaseModule',
      message: 'Executed query: SELECT * FROM "orders" WHERE "status" = \'PENDING\'',
      details: { rows: 12, timeMs: 4.8 },
    },
    {
      level: 'DEBUG',
      service: 'RedisCacheService',
      message: 'Cache HIT for key: dashboard_revenue_stats_2026',
      details: { key: 'dashboard_revenue_stats_2026', ttlSec: 300 },
    },
    {
      level: 'WARN',
      service: 'HTTP',
      message: 'POST /api/v1/orders/checkout 429 Too Many Requests',
      details: { statusCode: 429, limit: 60, windowMs: 60000 },
    },
    {
      level: 'INFO',
      service: 'HealthCheckModule',
      message: 'System Health Check: CPU 12%, Memory 48%, Storage 34% - OK',
      details: { status: 'healthy', cpuPct: 12, memPct: 48 },
    },
    {
      level: 'ERROR',
      service: 'OrdersService',
      message: 'Failed to process payment gateway callback: Webhook signature mismatch',
      details: { provider: 'Stripe', errorCode: 'SIG_INVALID' },
    },
    {
      level: 'INFO',
      service: 'HTTP',
      message: 'GET /api/v1/products/categories 200 OK',
      details: { statusCode: 200, durationMs: 8 },
    },
    {
      level: 'WARN',
      service: 'DatabaseModule',
      message: 'Slow query detected (>50ms): SELECT COUNT(*) FROM "audit_logs"',
      details: { durationMs: 68, thresholdMs: 50 },
    },
  ];

  constructor() {
    this.seedInitialLogs();
    this.startStreaming();
  }

  private seedInitialLogs(): void {
    const now = Date.now();
    const initialMsgs: Array<{
      level: LogLevel;
      service: string;
      message: string;
      details?: Record<string, unknown> | undefined;
    }> = [
      { level: 'INFO', service: 'NestFactory', message: 'Starting Nest application...' },
      {
        level: 'INFO',
        service: 'DatabaseModule',
        message: 'Successfully connected to PostgreSQL database (pool size: 10)',
      },
      {
        level: 'INFO',
        service: 'NestApplication',
        message: 'Nest application successfully started on port 3000',
      },
      {
        level: 'INFO',
        service: 'HTTP',
        message: 'GET /api/v1/health 200 OK',
        details: { status: 'UP' },
      },
    ];

    initialMsgs.forEach((item, index) => {
      const timestamp = new Date(now - (initialMsgs.length - index) * 5000).toLocaleTimeString(
        'en-US',
        {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        },
      );
      this.logs.push({
        id: `log-${this.counter++}`,
        timestamp,
        level: item.level,
        service: item.service,
        message: item.message,
        details: item.details,
      });
    });
  }

  private startStreaming(): void {
    if (this.timerId) return;

    this.timerId = setInterval(() => {
      if (this.isPaused) return;

      const template =
        this.sampleLogTemplates[Math.floor(Math.random() * this.sampleLogTemplates.length)];
      if (!template) return;

      const newEntry: LogEntry = {
        id: `log-${this.counter++}`,
        timestamp: new Date().toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
        level: template.level,
        service: template.service,
        message: template.message,
        details: template.details,
      };

      this.logs = [newEntry, ...this.logs].slice(0, 200);
      this.notifyListeners();
    }, 3000);
  }

  public subscribe(listener: LogListener): () => void {
    this.listeners.add(listener);
    listener(this.logs);

    return () => {
      this.listeners.delete(listener);
    };
  }

  private notifyListeners(): void {
    const currentLogs = [...this.logs];
    this.listeners.forEach((listener) => listener(currentLogs));
  }

  public getLogs(): LogEntry[] {
    return [...this.logs];
  }

  public togglePause(): boolean {
    this.isPaused = !this.isPaused;
    return this.isPaused;
  }

  public getIsPaused(): boolean {
    return this.isPaused;
  }

  public clear(): void {
    this.logs = [];
    this.notifyListeners();
  }

  public exportLogs(): void {
    const textContent = this.logs
      .map(
        (l) =>
          `[${l.timestamp}] [${l.level}] [${l.service}] ${l.message} ${l.details ? JSON.stringify(l.details) : ''}`,
      )
      .join('\n');

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `system_logs_${Date.now()}.log`;
    link.click();
    URL.revokeObjectURL(url);
  }
}

export const logStreamService = new LogStreamService();
