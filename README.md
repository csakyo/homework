# マークアップエンジニアの方がフロントエンドエンジニアになる為の課題
## JavaScriptの課題について
もりけん塾ではJavaScriptの課題[マークアップエンジニアの方がフロントエンドエンジニアになる為の課題](https://github.com/kenmori/handsonFrontend/blob/master/work/markup/1.md)に取り組んでいます。<br>
### もりけん塾について
JS課題に取り組み、gitのPRにて課題を提出、それぞれレビューをし合っています。<br>
課題で学んだことや、いただいたレビューなどは[ブログ](https://sakyou.net/)でアウトプットしています。


|  課題NO.  |内容|ブログでのまとめ/<br>codesandbox|
| :----: | ---- | :----: | 
|  1  |  【DOM構築】このDOMをhtml内のulの中に差し込んでください  ||
|  2  |  【DOM構築】このDOMをJavaScriptでつくり、html内のulの中に差し込んでください |　|
|  3  |  【DOM構築】 |
|  4  |  【DOM構築】配列を使ってDOM構築 |
|  5  |  【非同期処理/DOM構築】DOM構築とPromiseオブジェクト |
|  6  |  【非同期処理/DOM構築】3秒後に解決される様にする |
|  7  |  【非同期処理/DOM構築】ローディング実装 |
|  8  |  【非同期処理/DOM構築】3秒後にrejectを実行してthenでその値をコンソール出力してください。 |
|  9  |  【非同期処理/DOM構築】async await |
|  10  |  【非同期処理/DOM構築】try-catch-finaliy |
|  11  |  【擬似的にAPIを扱う】擬似的なAPIを使用し、fetchにて情報取得、DOM構築する |
|  12  |  【擬似的にAPIを扱う】クリックしたらリクエストをして、それらが表示されるようにしてください |
|  13  |  【擬似的にAPIを扱う】クリックしたらモーダルが出てきて、12で作ったボタンを押したらリクエストされ表示するようにしてください|
|  14  |  【擬似的にAPIを扱う】13で作ったモーダル内にinput (typeはnumber)をおいて、クリックした際にinput(type number)のvalueを取得して、リクエストできるようにしてください。 |
|  15  |  【擬似的にAPIを扱う】モーダル内に formをおいて、input(type number)値、input(type text)、を新たに作ったsubmitボタン押下でリクエスト、APIから値を取ってきてください |
|  16  |  【ニュースUIコンポーネント作成】擬似的なAPIを使用し、Newsのデータとして画面に表示させる。 |
|  17  |  【スライドショー作成】擬似的なAPIを使用し、画像のデータを取得し、クリックで差し代わるスライドショー |[Blog](https://sakyou.net/javascript/tast17/)<br>[codesandbox](https://codesandbox.io/s/red-glitter-hckl9r?file=/main.js)|
|  18  |  【スライドショー作成】スライドショーにドットのページネーションを追加。また、自動で画像が切り替わる機能の実装。 |[Blog](https://sakyou.net/javascript/task18/)<br>[codesandbox](https://codesandbox.io/s/cool-mestorf-21gqtz?file=/main.js)|
|  19  |  【コンテンツを組み合わせる】ニュースUIコンポーネントとスライドショーを合わせる|[Blog](https://sakyou.net/javascript/task19/)<br>[codesandbox](https://codesandbox.io/s/smoosh-cdn-fvfqlv)|
|  20  |  【ユーザーテーブル作成】APIから情報を取得し、テーブルとしてDOM構築する|[Blog](https://sakyou.net/javascript/task20/)<br>[codesandbox](https://codesandbox.io/s/crimson-dew-m5s95j?file=/main.js)|
|  21  |  【ユーザーテーブルにソート機能実装】ボタン押下でidによるソート機能の実装|[Blog](https://sakyou.net/javascript/task21/)<br>[codesandbox](https://codesandbox.io/s/loving-satoshi-954pov?file=/main.js)|
|  22  |  【ユーザーテーブルにソート機能実装】idに加え、年齢でのソートを追加|[Blog](https://sakyou.net/javascript/task22/)<br>[codesandbox](https://codesandbox.io/s/exciting-firefly-1imq51?file=/main.js)|
|  24  |  【会員登録画面作成】 <ul><li>利用規約のテキストを押すと、モーダルが立ち上がり、利用規約がテキストとして読める。スクロールが一番下に行ったらチェックボックスはcheckedになる。</li><li>checkedがtrueの場合送信ボタンを押下すると別ページのregister-done.htmlに飛ぶ</li></ul> |[Blog](https://sakyou.net/javascript/task24/)<br>[codesandbox](https://codesandbox.io/s/elastic-pond-53ldyf?file=/main.js)|
|  25  |  【会員登録画面作成】バリデーションを実装<br><ul><li>ユーザー名は16文字未満</li><li>メールアドレスは一般的なメール形式のバリデーション</li><li>パスワードのバリデーションは8文字以上の大小の英数字を交ぜたもの</li><li>利用規約のスクロール実装に併せて、チェックボックスのdisabledは外し、checkedになる</li><li>全ての入力がvalidの場合にのみ送信ボタンは緑色になり押下でき、register-done.htmlに遷移できる</li></ul>|[Blog](https://sakyou.net/javascript/task25/)<br>[codesandbox](https://codesandbox.io/s/affectionate-star-wfcysj?file=/main.js)|
|  26  |  【ログイン画面作成】<br><ul><li>ユーザー名とメールアドレスどちらも入れられるinput、パスワード入力inputがある</li><li>入力値と定めた固定値を比較し、あっていればコンテンツ画面へ遷移でき、間違っていれば失敗しましたページへ遷移する</li><li>この課題では値は固定値(name: "tanaka"、　email: "tanaka@gmail.com"、　pass: "N302aoe3")</li></ul>|[Blog](https://sakyou.net/javascript/%e3%80%90%e8%aa%b2%e9%a1%8c26%e3%80%91%e3%83%ad%e3%82%b0%e3%82%a4%e3%83%b3%e7%94%bb%e9%9d%a2%e4%bd%9c%e6%88%90-%e3%82%82%e3%82%8a%e3%81%91%e3%82%93%e5%a1%be/)<br>[codesandbox](https://codesandbox.io/s/intelligent-taussig-kc4242)|
|  27  |  【tokenチェック】tokenを参照してログインユーザーかどうかのチェックを追加|[Blog](https://sakyou.net/javascript/task27/)<br>[codesandbox](https://codesandbox.io/s/shy-architecture-74ci4k)|
|  28  |  【パスワード忘れた方へページの実装】<br><ul><li>ローカルストレージに登録されているメールアドレスを参照し、合っていればパスワード再設定ページへ遷移</li><li>パスワード変更ページにて、新しいPWと確認用のPWを入力し、値が合っていればsubmitボタンが押せる</li><li>submitボタンを押すと、ローカルストレージ内の値を書き換え、その後新しいPWでログインができる</li></ul>|
