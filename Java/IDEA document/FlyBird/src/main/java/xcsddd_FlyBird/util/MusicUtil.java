package xcsddd_FlyBird.util;

import javazoom.jl.decoder.JavaLayerException;
import javazoom.jl.player.Player;

import javax.sound.sampled.*;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

public class MusicUtil {

    private static Clip flyClip;
    private static Clip crashClip;
    private static Clip scoreClip;

    // 播放wav文件
    public static void playFly() {
        playWav("resources/wav/fly.wav", flyClip);
    }

    public static void playCrash() {
        playWav("resources/wav/crash.wav", crashClip);
    }

    public static void playScore() {
        playWav("resources/wav/score.wav", scoreClip);
    }

    private static void playWav(String filePath, Clip clip) {
        try {
            // 打开音频输入流
            AudioInputStream audioInputStream = AudioSystem.getAudioInputStream(new File(filePath));
            // 获取音频剪辑对象
            clip = AudioSystem.getClip();
            // 打开音频剪辑
            clip.open(audioInputStream);
            // 开始播放
            clip.start();
        } catch (UnsupportedAudioFileException | IOException | LineUnavailableException e) {
            e.printStackTrace();
        }
    }

    // 播放mp3文件
    public static void playMP3(String filePath) {
        try {
            FileInputStream fileInputStream = new FileInputStream(filePath);
            Player player = new Player(fileInputStream);
            player.play();
        } catch (JavaLayerException | IOException e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        // 示例：播放wav文件
        playFly();
        playCrash();
        playScore();

        // 示例：播放mp3文件
        playMP3("resources/mp3/somefile.mp3");
    }

    public static void setFlyClip(Clip flyClip) {
        MusicUtil.flyClip = flyClip;
    }

    public static void setCrashClip(Clip crashClip) {
        MusicUtil.crashClip = crashClip;
    }

    public static void setScoreClip(Clip scoreClip) {
        MusicUtil.scoreClip = scoreClip;
    }
}
