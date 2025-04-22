package Zap

import (
	"go.uber.org/zap"
	"time"
)

func Demo() {
	/*
		Example适合用在测试代码中，Development在开发环境中使用，Production用在生成环境。
	*/
	logger := zap.NewExample()
	defer func(logger *zap.Logger) {
		err := logger.Sync()
		if err != nil {
			return
		}
	}(logger)

	url := "https://example.org/api"
	logger.Info("failed to fetch URL",
		zap.String("url", url),
		zap.Int("attempt", 3),
		zap.Duration("backoff", time.Second),
	)

	sugar := logger.Sugar()
	sugar.Infow("failed to fetch URL",
		"url", url,
		"attempt", 3,
		"backoff", time.Second,
	)
	sugar.Infof("Failed to fetch URL: %s", url)
}
