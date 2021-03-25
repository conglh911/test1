package vn.mobifone.eoffice;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import androidx.appcompat.app.AppCompatActivity;
import android.view.animation.AlphaAnimation;

public class SplashActivity extends AppCompatActivity {
    // Splash screen timer
    private static int SPLASH_TIME_OUT = 3000;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_splash);
        fadein(this, R.id.splash, 200);
      new Handler().postDelayed(new Runnable() {
        @Override
        public void run() {

          Intent intent = new Intent(SplashActivity.this, MainActivity.class);
          startActivity(intent);
          overridePendingTransition(R.anim.zoom_enter, R.anim.zoom_exit);
          finish();
        }
      }, SPLASH_TIME_OUT);
    }

    private void fadein(Activity activity, int id, int duration) {
        AlphaAnimation alphaAnimation = new AlphaAnimation(0.0F, 1.0F);
        alphaAnimation.setFillBefore(false);
        alphaAnimation.setFillAfter(true);
        alphaAnimation.setDuration(duration);
        activity.findViewById(id).startAnimation(alphaAnimation);
    }
}
