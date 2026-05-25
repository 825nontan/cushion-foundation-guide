/* ========================
   DOM読み込み完了時の処理
   ======================== */

// ページが完全に読み込まれてから実行する
document.addEventListener('DOMContentLoaded', function() {
    // 初期化関数を呼ぶ
    initializeApp();
});

/* ========================
   初期化関数
   ======================== */

// ページの初期化処理をまとめた関数
function initializeApp() {
    // カードのインタラクティブな機能を設定
    setupCardInteractions();
    
    // スムーズなスクロールを設定
    setupSmoothScroll();
    
    // ページロード時のアニメーション
    animateOnLoad();
}

/* ========================
   カード関連の機能
   ======================== */

// カードのマウスイベントを設定する関数
function setupCardInteractions() {
    // すべてのプロダクトカードを取得
    const cards = document.querySelectorAll('.product-card');
    
    // 各カードに対してイベントリスナーを追加
    cards.forEach(function(card, index) {
        // マウスを乗せた時のイベント
        card.addEventListener('mouseenter', function() {
            handleCardHover(card, true);
        });
        
        // マウスが離れた時のイベント
        card.addEventListener('mouseleave', function() {
            handleCardHover(card, false);
        });
        
        // クリック時のイベント
        card.addEventListener('click', function() {
            handleCardClick(card, index);
        });
        
        // キーボード操作（Enter キー）
        card.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                handleCardClick(card, index);
            }
        });
    });
}

// カードのホバー時の処理
function handleCardHover(card, isHovering) {
    if (isHovering) {
        // ホバー中：カードの内容を強調
        card.style.cursor = 'pointer';
    } else {
        // ホバー終了：スタイルをリセット
        card.style.cursor = 'default';
    }
}

// カードのクリック処理
function handleCardClick(card, index) {
    // クリックされたカードの製品情報を取得
    const productName = card.querySelector('.product-name').textContent;
    const productType = card.querySelector('.product-type').textContent;
    
    // コンソールに出力（デバッグ用）
    console.log(`カード ${index + 1} がクリックされました: ${productName}`);
    
    // 将来的には、詳細ページへの遷移やモーダル表示などができます
}

/* ========================
   スムーズスクロール
   ======================== */

// スムーズなスクロール機能を設定する関数
function setupSmoothScroll() {
    // ページ内のリンク（#で始まる）に対してスムーズスクロール機能を追加
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(event) {
            // デフォルトのジャンプ動作をキャンセル
            event.preventDefault();
            
            // リンク先のID を取得
            const target = document.querySelector(this.getAttribute('href'));
            
            // ターゲットが存在すれば、スムーズにスクロール
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/* ========================
   ページロード時のアニメーション
   ======================== */

// ページロード時にカードをアニメーション表示する関数
function animateOnLoad() {
    // すべてのプロダクトカードを取得
    const cards = document.querySelectorAll('.product-card');
    
    // 各カードに対して遅延でアニメーションを適用
    cards.forEach(function(card, index) {
        // 初期状態：透明度0、下にずれた位置
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        // 遅延後にアニメーション開始
        // インデックスに応じて異なるタイミングで実行
        setTimeout(function() {
            // アニメーション用のクラスを追加
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100); // 各カードを100ms間隔で表示
    });
}

/* ========================
   ユーティリティ関数
   ======================== */

// ページの上部にスムーズにスクロールする関数
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// 現在のスクロール位置を取得する関数
function getCurrentScrollPosition() {
    return window.scrollY || window.pageYOffset;
}

// ページ内のセクションが表示されているかをチェック
function isElementInViewport(element) {
    // 要素の位置情報を取得
    const rect = element.getBoundingClientRect();
    
    // ビューポート内に見えているか判定
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/* ========================
   ウィンドウリサイズ時の処理
   ======================== */

// ウィンドウリサイズ時のイベント
window.addEventListener('resize', function() {
    // 画面サイズが変更された時の処理
    console.log('ウィンドウサイズが変更されました');
    
    // 必要に応じてレイアウト調整などの処理をここに追加
});

/* ========================
   スクロール時の処理
   ======================== */

// スクロール時のイベント
window.addEventListener('scroll', function() {
    // 現在のスクロール位置を取得
    const scrollPosition = getCurrentScrollPosition();
    
    // スクロール位置に応じた処理をここに追加可能
    // 例：スクロール時のアニメーション、ナビゲーション表示/非表示など
});

/* ========================
   デバッグ用の関数
   ======================== */

// ページ情報をコンソールに出力する関数
function logPageInfo() {
    console.log('=== ページ情報 ===');
    console.log(`ページタイトル: ${document.title}`);
    console.log(`ウィンドウ幅: ${window.innerWidth}px`);
    console.log(`ウィンドウ高さ: ${window.innerHeight}px`);
    console.log(`スクロール位置: ${getCurrentScrollPosition()}px`);
    console.log(`プロダクトカード数: ${document.querySelectorAll('.product-card').length}`);
}

// ページロード時にデバッグ情報を出力（開発時用）
console.log('クッションファンデーション紹介ページが読み込まれました！');
