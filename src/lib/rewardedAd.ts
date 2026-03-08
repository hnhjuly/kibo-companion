// ═══════════════════════════════════════════════════════════════════
// REWARDED AD WRAPPER — Pre-built for future AdSense integration
// ═══════════════════════════════════════════════════════════════════
//
// HOW TO ACTIVATE:
// 1. Sign up for Google AdSense: https://www.google.com/adsense
// 2. Get approved and obtain your ad client ID & ad slot ID
// 3. Add the AdSense script to index.html:
//    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXX" crossorigin="anonymous"></script>
// 4. Update AD_CONFIG below with your real IDs
// 5. Set AD_CONFIG.enabled = true
//
// The component will show a "Watch ad for ❤️" button.
// When ads aren't enabled, it simulates a short delay (for testing).
// ═══════════════════════════════════════════════════════════════════

export const AD_CONFIG = {
  enabled: false, // Set to true once AdSense is approved
  adClient: "ca-pub-XXXXXXXXXXXXXXXX", // Your AdSense publisher ID
  adSlot: "XXXXXXXXXX", // Your rewarded ad slot ID
  simulatedDelayMs: 3000, // Fake delay for testing without real ads
};

/**
 * Show a rewarded ad. Returns a promise that resolves when the user
 * finishes watching (or simulates it if ads aren't enabled).
 */
export function showRewardedAd(): Promise<boolean> {
  return new Promise((resolve) => {
    if (!AD_CONFIG.enabled) {
      // Simulate watching an ad (for dev/testing)
      setTimeout(() => resolve(true), AD_CONFIG.simulatedDelayMs);
      return;
    }

    // Future: Real AdSense rewarded ad integration
    // The Google AdSense Rewarded Ad API would go here:
    //
    // window.adsbygoogle = window.adsbygoogle || [];
    // const rewardedAd = new window.google.ima.AdDisplayContainer(...);
    // rewardedAd.addEventListener('complete', () => resolve(true));
    // rewardedAd.addEventListener('skipped', () => resolve(false));
    // rewardedAd.addEventListener('error', () => resolve(false));
    // rewardedAd.show();

    // Fallback if something goes wrong
    setTimeout(() => resolve(false), 5000);
  });
}
