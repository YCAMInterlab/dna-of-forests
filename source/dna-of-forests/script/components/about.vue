<template lang="pug">

article
  h1
    img(alt='森のDNA図鑑 仁保の森 2016' src='img/about/logo.png' srcset='img/about/logo@2x.png 2x')

  section
    h2
      img(alt='「森のDNA図鑑」について' src='img/about/title-about.png' srcset='img/about/title-about@2x.png 2x')
    p
      | 私たちが何気なく見ている自然の風景にも、たくさんの情報が眠っています。その眠っている情報を自分たちで採集しながら、ひとつの図鑑をつくることを通じて、複眼的な見方を養っていくプロジェクトです。<br>
      | このウェブサイトでは仁保の森のある地点から、ぐるっと360°の風景を見渡し、ワークショップ参加者が採集した情報を引き出すことができます。
    a.btn(href="http://www.ycam.jp/events/2016/ycam-bio-research-open-day-vol3/" target="_blank") YCAMバイオ・リサーチのワークショップ「森のDNA」
  section#dna-barcoding
    h2
      img(alt='解析方法（DNAバーコーディング）について' src='img/about/title-dna_barcoding.png' srcset='img/about/title-dna_barcoding@2x.png 2x')
    p
      | すべての生き物が、それぞれのDNAを持っています。DNAは生き物の設計情報を記録している物質です。生き物のDNAに書かれている情報の一部を読み取り、既に知られているDNAの情報と照らし合わせることで、ある程度、種名を調べる事ができるようになってきています。この技術は「DNAバーコーディング」と呼ばれており、専門家以外でも種の特定を可能とする技術として取り組みが広がってきています。<br>
      | 今回のプロジェクトでは、実際に森で採集した生き物からDNAを取り出し、植物・昆虫・菌類それぞれに標準化されたDNA情報を用いて、データベース上で検索を行い、生物種の特定を試みました。具体的には、植物では葉緑体のrbcLやmatK、昆虫ではミトコンドリアのCOI、菌類ではITSと呼ばれる領域のDNAを利用しました。<br>
      | また、検索にはバイオインフォマティクスでDNAの類似した部分を並べて照らし合わせることができる「BLAST」と呼ばれるプログラムを利用しました。
    a.btn(href="https://blast.ncbi.nlm.nih.gov/Blast.cgi" target="_blank") BLAST: Basic Local Alignment Search Tool
  section
    h2
      img(alt='仁保の森について' src='img/about/title-niho_forest.png' srcset='img/about/title-niho_forest@2x.png 2x')
    p
      | 私たちが何気なく見ている自然の風景にも、たくさんの情報が眠っています。その眠っている情報を自分たちで採集しながら、ひとつの図鑑をつくることを通じて、複眼的な見方を養っていくプロジェクトです。<br>
      | このウェブサイトでは仁保の森のある地点から、ぐるっと360°の風景を見渡し、ワークショップ参加者が採集した情報を引き出すことができます。
    a.btn(href="https://goo.gl/maps/Fm9EAftjMMA2" target="_blank") サンプルの採取地点をGoogleMapsで見る

  section#credit
    h3
      img(alt='制作・協力' src='img/about/title-credit.png' srcset='img/about/title-credit@2x.png 2x')
    p
      | 図鑑ウェブ制作：<a href="http://karappo.net" target="_blank">Karappo Inc.</a><br>
      | 講師：<a href="http://www.yamahaku.pref.yamaguchi.lg.jp/" target="_blank">田中 浩（山口県立博物館動物担当理学博士）</a><br>
      | <a href="http://www.ycam.jp/projects/ycam-bio-research/" target="_blank">高原 文江　津田 和俊　朴 鈴子　伊藤 隆之　菅沼 聖</a><br>
      | スマホ顕微鏡技術協力：<a href="防府市青少年科学館ソラール" target="_blank">寺田 勉（防府市青少年科学館ソラール館長）</a><br>
      | 録音・音源編集：<a href="http://www.antoinebertin.org/" target="_blank">Antoine Bertin（antoinebertin.org）</a><br>
      | 試薬提供：<a href="https://www.kanto.co.jp/" target="_blank">関東科学株式会社</a>

</template>

<style lang="sass?indentedSyntax" scoped>

article
  height: 100%
  overflow-y: auto

h1
  text-align: center
  margin-top: 68px
  margin-bottom: 68px
section
  width: 600px
  margin: 0 auto
  text-align: center
  margin-bottom: 96px
  &#credit
    width: auto
    background-color: #202020
    padding: 108px 0
    margin-bottom: 0
    p
      text-align: center
      a
        color: inherit
        text-decoration: none
        &:hover
          opacity: 0.7
h2
  text-align: center
  margin-bottom: 38px
h3
  text-align: center
  margin-bottom: 24px
p
  font-size: 15px
  line-height: 2.2em
  letter-spacing: 0.15em
  text-align: left
  margin-bottom: 2.2em
a.btn
  display: inline-block
  font-size: 13px
  letter-spacing: 0.05em
  color: rgba(255,255,255,0.7)
  padding: 12px 20px 12px 42px
  text-decoration: none
  border: 1px solid #3f3f3f
  border-radius: 8px
  background: url(/dna-of-forests/img/about/arrow.png) no-repeat 17px center
  &:hover
    color: #fff
    border-color: #ccc

</style>