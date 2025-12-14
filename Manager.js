//*============================================
//  UNBLOCKED GAMES - CLASSROOM RESOURCES
//  Manager.js - Ad Functions Bypassed
//============================================*//

//*-------- Show Interstitial --------*//
function ShowInter(complete) {
	// Reklam atlanıyor - direkt callback çağır
	console.log('[Manager] Interstitial ad skipped');
	
	// Kısa delay ile callback çağır (oyunun düzgün çalışması için)
	setTimeout(function() {
		if (complete && typeof complete === 'function') {
			complete();
		}
	}, 100);
}

//*-------- Show Rewarded --------*//
function ShowRewarded(success, failure) {
	// Ödüllü reklam atlanıyor - direkt ödül ver
	console.log('[Manager] Rewarded ad skipped - reward granted');
	
	// Kısa delay ile success callback çağır
	setTimeout(function() {
		if (success && typeof success === 'function') {
			success();
		}
	}, 100);
}

//*-------- Prompt Function --------*//
function Prompt(msg, duration) {
	duration = isNaN(duration) ? 3000 : duration;
	
	if (!this.prompt_) {
		this.prompt_ = document.createElement('div');
		this.prompt_.style.cssText = "font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 80%; min-width: 280px; padding: 16px 24px; color: #fff; line-height: 1.5; text-align: center; border-radius: 8px; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 999999; background: rgba(0, 0, 0, 0.85); font-size: 14px; box-shadow: 0 4px 20px rgba(0,0,0,0.3);";
		document.body.appendChild(this.prompt_);
	}
	
	this.prompt_.innerHTML = msg;
	this.prompt_.style.display = "block";
	this.prompt_.style.opacity = '1';
	
	setTimeout(function() {
		this.prompt_.style.transition = 'opacity 0.3s ease-out';
		this.prompt_.style.opacity = '0';
		setTimeout(function() {
			this.prompt_.style.display = "none";
		}.bind(this), 300);
	}.bind(this), duration);
}

//*-------- Dummy YSDK Object --------*//
// Eğer oyun ysdk'yı direkt çağırırsa hata vermesin
window.ysdk = {
	adv: {
		showFullscreenAdv: function(options) {
			console.log('[Manager] ysdk.adv.showFullscreenAdv bypassed');
			if (options && options.callbacks) {
				if (options.callbacks.onClose) {
					setTimeout(function() {
						options.callbacks.onClose(false);
					}, 100);
				}
			}
		},
		showRewardedVideo: function(options) {
			console.log('[Manager] ysdk.adv.showRewardedVideo bypassed');
			if (options && options.callbacks) {
				if (options.callbacks.onOpen) options.callbacks.onOpen();
				if (options.callbacks.onRewarded) options.callbacks.onRewarded();
				if (options.callbacks.onClose) {
					setTimeout(function() {
						options.callbacks.onClose();
					}, 100);
				}
			}
		}
	},
	features: {
		LoadingAPI: {
			ready: function() {
				console.log('[Manager] ysdk.features.LoadingAPI.ready bypassed');
			}
		}
	}
};

//*-------- Prevent YaGames Error --------*//
// YaGames global objesi yoksa oluştur
if (typeof YaGames === 'undefined') {
	window.YaGames = {
		init: function() {
			console.log('[Manager] YaGames.init bypassed');
			return Promise.resolve(window.ysdk);
		}
	};
}

//*-------- Ad State Variables --------*//
window.adShowing = false;
window.rewardDone = false;

console.log('[Manager] Ad-free mode enabled - All ads bypassed');