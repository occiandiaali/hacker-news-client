package com.easyhn;

import com.facebook.react.ReactActivity;
import org.pgsqlite.SQLitePluginPackage;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "EasyHN";
  }

  @Override
  protected List<ReactPackage> getPackages() {
    return Arrays.<ReactPackage>asList(
      new SQLitePluginPackage(),
      new MainReactPackage());
  }

}
