import UIKit
import Capacitor
import RookSDK
import RookAppleHealth

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

    var window: UIWindow?

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        // Override point for customization after application launch.
      RookBackGroundSync.shared.setBackListeners()
      setupNotification()
      handleEvents()
        return true
    }

    func applicationWillResignActive(_ application: UIApplication) {
        // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
        // Use this method to pause ongoing tasks, disable timers, and invalidate graphics rendering callbacks. Games should use this method to pause the game.
    }

    func applicationDidEnterBackground(_ application: UIApplication) {
        // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later.
        // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
    }

    func applicationWillEnterForeground(_ application: UIApplication) {
        // Called as part of the transition from the background to the active state; here you can undo many of the changes made on entering the background.
    }

    func applicationDidBecomeActive(_ application: UIApplication) {
        // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
    }

    func applicationWillTerminate(_ application: UIApplication) {
        // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
    }

    func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey: Any] = [:]) -> Bool {
        // Called when the app was launched with a url. Feel free to add additional processing here,
        // but if you want the App API to support tracking app url opens, make sure to keep this call
        return ApplicationDelegateProxy.shared.application(app, open: url, options: options)
    }

    func application(_ application: UIApplication, continue userActivity: NSUserActivity, restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void) -> Bool {
        // Called when the app was launched with an activity, including Universal Links.
        // Feel free to add additional processing here, but if you want the App API to support
        // tracking app url opens, make sure to keep this call
        return ApplicationDelegateProxy.shared.application(application, continue: userActivity, restorationHandler: restorationHandler)
    }
  
  func setupNotification() {
    UNUserNotificationCenter.current().requestAuthorization(options: [.alert, .sound, .badge]) { (permissionGraded, error) in
      debugPrint(permissionGraded)
    }
    
    UNUserNotificationCenter.current().delegate = self
  }

}

extension AppDelegate: UNUserNotificationCenterDelegate {
  
  func userNotificationCenter(_ center: UNUserNotificationCenter, willPresent notification: UNNotification) async -> UNNotificationPresentationOptions {
    return [.banner, .sound]
  }
}

// MARK:  RookAutomatic Events

extension AppDelegate {
  func handleEvents() {
    RookBackGroundExtraction.shared.handleStepsUpdate = { [weak self] steps in
      
      let dateFormatterWithTime: DateFormatter = {
          let dateFormatter = DateFormatter()
          dateFormatter.calendar = Calendar(identifier: .gregorian)
          dateFormatter.locale = Locale(identifier: Locale.preferredLanguages[0])
          dateFormatter.dateFormat = "yyyy-MM-dd HH:mm:ss"
          return dateFormatter
      }()
      
      self?.scheduleLocalNotification(
        body: "Your step count of \(dateFormatterWithTime.string(from: Date())) is \(steps)",
        category: "activity",
        type: "steps")
      
    }
    
    RookBackGroundExtraction.shared.handleCaloriesUpdate = { [weak self] calories in
      let dateFormatterWithTime: DateFormatter = {
          let dateFormatter = DateFormatter()
          dateFormatter.calendar = Calendar(identifier: .gregorian)
          dateFormatter.locale = Locale(identifier: Locale.preferredLanguages[0])
          dateFormatter.dateFormat = "yyyy-MM-dd HH:mm:ss"
          return dateFormatter
      }()
      
      self?.scheduleLocalNotification(
        body: "\(dateFormatterWithTime.string(from: Date())) you have actively burned \(calories)",
        category: "activity",
        type: "energyBurned")
    }

    RookBackGroundSync.shared.handleSummariesUploaded = { [weak self] in
      let dateFormatterWithTime: DateFormatter = {
          let dateFormatter = DateFormatter()
          dateFormatter.calendar = Calendar(identifier: .gregorian)
          dateFormatter.locale = Locale(identifier: Locale.preferredLanguages[0])
          dateFormatter.dateFormat = "yyyy-MM-dd HH:mm:ss"
          return dateFormatter
      }()
      
      self?.scheduleLocalNotification(
        body: "\(dateFormatterWithTime.string(from: Date())) summaries uploaded",
        category: "summaries",
        type: "daily")
    }
  
    RookBackGroundSync.shared.handleActivityEventsUploaded = { [weak self] in
      let dateFormatterWithTime: DateFormatter = {
          let dateFormatter = DateFormatter()
          dateFormatter.calendar = Calendar(identifier: .gregorian)
          dateFormatter.locale = Locale(identifier: Locale.preferredLanguages[0])
          dateFormatter.dateFormat = "yyyy-MM-dd HH:mm:ss"
          return dateFormatter
      }()
      
      self?.scheduleLocalNotification(
        body: "\(dateFormatterWithTime.string(from: Date())) workouts uploaded",
        category: "events",
        type: "workouts")
    }
    
    RookBackGroundSync.shared.handleEventsUploaded = { [weak self] type in
      let dateFormatterWithTime: DateFormatter = {
          let dateFormatter = DateFormatter()
          dateFormatter.calendar = Calendar(identifier: .gregorian)
          dateFormatter.locale = Locale(identifier: Locale.preferredLanguages[0])
          dateFormatter.dateFormat = "yyyy-MM-dd HH:mm:ss"
          return dateFormatter
      }()
      
      self?.scheduleLocalNotification(
        body: "\(dateFormatterWithTime.string(from: Date())) \(type) uploaded",
        category: "events",
        type: "\(type)")
    }
  }
  
  private func scheduleLocalNotification(body: String,
                                         category: String,
                                         type: String) {
    // Create Notification Content
    let notificationContent = UNMutableNotificationContent()
    
    // Configure Notification Content
    notificationContent.title = Bundle.main.object(forInfoDictionaryKey: "CFBundleName") as? String ?? ""
    notificationContent.subtitle = "local notification health"
    notificationContent.body = body
    notificationContent.categoryIdentifier = category
    notificationContent.sound = .defaultCritical
    
    // Add Trigger
    let notificationTrigger = UNTimeIntervalNotificationTrigger(timeInterval: 1.0,
                                                                repeats: false)
    
    // Create Notification Request
    let notificationRequest = UNNotificationRequest(identifier: "rook \(category) \(type) \(Date())",
                                                    content: notificationContent, trigger: notificationTrigger)
    
    // Add Request to User Notification Center
    UNUserNotificationCenter.current().add(notificationRequest) { (error) in
      if let error = error {
        print("Unable to Add Notification Request (\(error), \(error.localizedDescription))")
      }
    }
  }
}

