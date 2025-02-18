package xcsddd_FlyBird.app;

/*
 * 游戏入口
 */

import xcsddd_FlyBird.util.MusicUtil;

import java.util.Timer;
import java.util.TimerTask;

public class App {
	public static void main(String[] args) {
		new Game();
		// 创建Timer对象
		Timer timer = new Timer();
		// 创建TimerTask并设置调用
		TimerTask task = new TimerTask() {
			@Override
			public void run() {
				MusicUtil.playMP3("resources/mp3/somefile.mp3");
			}
		};

		// 每隔1秒调用一次
		timer.scheduleAtFixedRate(task, 0, 1000);  // 初始延迟0秒，每隔1秒调用一次

	}
}
