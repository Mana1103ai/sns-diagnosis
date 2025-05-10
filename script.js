document.addEventListener('DOMContentLoaded', function() {
    // 要素の取得
    const form = document.getElementById('diagnosis-form');
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const selectionStatus = document.getElementById('selection-status');
    const diagnosisButton = document.getElementById('diagnosis-button');
    const resultType = document.getElementById('result-type');
    const resultDescription = document.getElementById('result-description');
    const retryButton = document.getElementById('retry-button');

    // 初期値を設定
    selectionStatus.textContent = "0/5 選択中";
    
    // 診断結果のデータ
    const resultData = {
        positive: {
            title: "ポジティブ無双タイプ",
            description: "あなたは「ポジティブ無双タイプ」！ 投稿に自然と明るさがにじみ出る、SNSの太陽みたいな存在。 「ま、いっか！」の精神で、前向きな言葉を軽やかに放ち、誰かの1日をちょっと良くしてる。 迷ってる人をふっと笑わせる天才。あなたの元気が、誰かの元気になってるよ！",
      image:"images/poji.jpg"
        },
        emotional: {
            title: "感情脚本家タイプ",
            description: "あなたは「感情脚本家タイプ」！ ふとした気づきや心の動きを、物語のように伝える力を持つ人。 投稿には余韻があり、誰かの心にふわっと入り込む。 「そろそろ全米、泣いてくれないかなー」と思うその感性は、SNSという舞台で光る演出力そのもの。",
        image:"images/geki.jpg"
        },
        organizer: {
            title: "おまとめ先生タイプ",
            description: "あなたは「おまとめ先生タイプ」！ 情報や思考をスッキリ整理して、誰かに\"わかりやすさ\"を届ける名手。 構造化や図解が得意で、「3つにまとめるとこう！」が口ぐせになってるかも？ 読んだ人が「なるほど！」とひざを打つ、納得感あふれる投稿があなたの強み。",
        image:"images/sen.jpg"
        },
        involving: {
            title: "巻き込み天才タイプ",
            description: "あなたは「巻き込み天才タイプ」！ 気づけばリプ欄が盛り上がり、参加型の投稿がいつの間にか\"お祭り\"になる、SNSのムードメーカー。 「みんなー！集合ー！」と自然に声をかけられる空気感は唯一無二。 あなたの呼びかけが、たくさんの人を動かしてる！",
       image:"images/hap.jpg"
        },
        sniper: {
            title: "一言スナイパータイプ",
            description: "あなたは「一言スナイパータイプ」！ 言葉数は少なくても、\"刺さるひと言\"で印象を残す投稿が得意。 140字以内で「これ、好き」「わかる…！」を生み出す力は、まさにSNSの狙撃手。 「シンプルの美学！」を掲げるあなたのスタイルが、静かに光ってる。",
      image:"images/suna.jpg"
        }
    };

    // チェックボックスの選択数を監視
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function (e) {
            // 明示的にDOMから選択されたチェックボックスの数を数える
            const currentlyChecked = document.querySelectorAll('input[type="checkbox"]:checked').length;
            console.log("チェック数:", currentlyChecked); // デバッグ用

            if (this.checked && currentlyChecked > 5) {
                // 6個目がチェックされようとしたとき → 外してアラート
                this.checked = false;
                alert('※チェックは5個までです');
                return;
            }

            // 選択数の表示を更新 - より明示的に
            if (selectionStatus) {
                selectionStatus.textContent = currentlyChecked + "/5 選択中";
                console.log("更新:", selectionStatus.textContent); // デバッグ用
            } else {
                console.error("selection-status要素が見つかりません");
            }

            // 診断ボタンの有効／無効切り替え
diagnosisButton.disabled = currentlyChecked === 0;
        });
    });

// 診断ボタンのクリックイベント
form.addEventListener('submit', function(e) { 
    e.preventDefault();
        
    // 各タイプのスコアを集計
    const scores = {
        positive: 0,
        emotional: 0,
        organizer: 0,
        involving: 0,
        sniper: 0
    };
    
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            scores[checkbox.value]++;
        }
    });
    
    // 最高スコアのタイプを特定
    let maxScore = 0;
    let maxType = '';
    
    for (const type in scores) {
        if (scores[type] > maxScore) {
            maxScore = scores[type];
            maxType = type;
        }
    }
    
    // 結果がタイなら、ランダムに一つ選ぶ
    const tiedTypes = [];
    for (const type in scores) {
        if (scores[type] === maxScore) {
            tiedTypes.push(type);
        }
    }
    
    if (tiedTypes.length > 1) {
        maxType = tiedTypes[Math.floor(Math.random() * tiedTypes.length)];
    }
    
    // 画像の表示処理
    const existingImage = document.querySelector('.result-image');
    if (existingImage) {
        existingImage.remove(); // 前回表示の画像があれば削除
    }
    
    const resultImage = document.createElement('img');
    resultImage.src = resultData[maxType].image;
    resultImage.alt = resultData[maxType].title;
    resultImage.classList.add('result-image');
    resultType.after(resultImage); // タイトルの直後に画像を挿入
    
    // 結果を表示
    resultType.textContent = resultData[maxType].title;
    
    // 説明文を取得
    let description = resultData[maxType].description;
    
    // タイプ名を太字かつピンク色に
    description = description.replace(/「ポジティブ無双タイプ」/g, '<strong class="highlight-pink">「ポジティブ無双タイプ」</strong>');
    description = description.replace(/「感情脚本家タイプ」/g, '<strong class="highlight-pink">「感情脚本家タイプ」</strong>');
    description = description.replace(/「おまとめ先生タイプ」/g, '<strong class="highlight-pink">「おまとめ先生タイプ」</strong>');
    description = description.replace(/「巻き込み天才タイプ」/g, '<strong class="highlight-pink">「巻き込み天才タイプ」</strong>');
    description = description.replace(/「一言スナイパータイプ」/g, '<strong class="highlight-pink">「一言スナイパータイプ」</strong>');
    
    // HTMLとして設定
    resultDescription.innerHTML = description;

    // シェアURLの設定 - ここから追加
    const websiteUrl = window.location.href.split('?')[0]; // クエリパラメータを除いたURL
    const shareText = `私は「${resultData[maxType].title}」でした！ あなたはどのタイプ？`;
    
    // Xのシェアリンク設定
    document.getElementById('share-x').href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(websiteUrl)}`;
    
    // LINEのシェアリンク設定
    document.getElementById('share-line').href = `https://line.me/R/msg/text/?${encodeURIComponent(shareText + ' ' + websiteUrl)}`;
    // ここまで追加
    
    // ページ切り替え - 新しいコード
    document.getElementById('diagnosis-page').classList.remove('active');
    document.getElementById('result-page').classList.add('active');
});

// もう一度診断するボタンのイベント
retryButton.addEventListener('click', function() {
    // チェックボックスをすべて解除
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
        checkbox.disabled = false;
    });
    
    // カウンターをリセット
    selectionStatus.textContent = '0/5 選択中';
    
    // 診断ボタンを無効化
    diagnosisButton.disabled = true;
    
    // ページ切り替え 
    document.getElementById('result-page').classList.remove('active');
    document.getElementById('diagnosis-page').classList.add('active');
});

// 初期状態では診断ボタンを無効化
diagnosisButton.disabled = true;

}); // DOMContentLoadedイベントを閉じる最後の括弧
