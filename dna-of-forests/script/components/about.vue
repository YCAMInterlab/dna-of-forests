<template lang="pug">

article.about
  h1
    img(alt='森のDNA図鑑 仁保の森 2016' src='img/about/logo.png' srcset='img/about/logo@2x.png 2x')

  section
    h2
      img(alt='「森のDNA図鑑」について' src='img/about/title-about.png' srcset='img/about/title-about@2x.png 2x')
    p
      | YCAMバイオ・リサーチのワークショップ「<a class="border" href="http://www.ycam.jp/events/2016/ycam-bio-research-open-day-vol3/" target="_blank">森のDNA</a>」の参加者と山口市の仁保の森で生き物を採集し、顕微鏡での観察記録やDNA解析の結果を収録しています。<a class="border" href="https://goo.gl/maps/Fm9EAftjMMA2" target="_blank">仁保の森のある地点</a>から、ぐるっと360°パノラマの風景を見渡し、ワークショップ参加者が採集した情報を引き出すことができます。<br>
      | 私達が何気なく見ている自然の風景にも、たくさんの情報が眠っています。「森のDNA」は、その眠っている情報を自分たちで採集しながら、ひとつの図鑑をつくることを通じて、複眼的な見方を養っていくプロジェクトです。<br>
      | この「森のDNA」は、ロンドンを拠点に活躍するクリエティブ・スタジオ「マシュマロ・レーザー・フィースト（MLF）」によるバーチャル・リアリティ作品「<a class="border" href="http://www.ycam.jp/events/2016/in-the-eyes-of-the-animal/" target="_blank">もしも、森の生き物になったら</a>」の仁保の森ツアープログラムとして開催されました。
    .carousel
      img.carousel-cell(alt='ワークショップの様子' src='img/about/slide/9.jpg' srcset='img/about/slide/9@2x.jpg 2x')
      img.carousel-cell(alt='ワークショップの様子' src='img/about/slide/10.jpg' srcset='img/about/slide/10@2x.jpg 2x')
      img.carousel-cell(alt='ワークショップの様子' src='img/about/slide/1.jpg' srcset='img/about/slide/1@2x.jpg 2x')
      img.carousel-cell(alt='ワークショップの様子' src='img/about/slide/2.jpg' srcset='img/about/slide/2@2x.jpg 2x')
      img.carousel-cell(alt='ワークショップの様子' src='img/about/slide/3.jpg' srcset='img/about/slide/3@2x.jpg 2x')
      img.carousel-cell(alt='ワークショップの様子' src='img/about/slide/4.jpg' srcset='img/about/slide/4@2x.jpg 2x')
      img.carousel-cell(alt='ワークショップの様子' src='img/about/slide/5.jpg' srcset='img/about/slide/5@2x.jpg 2x')
      img.carousel-cell(alt='ワークショップの様子' src='img/about/slide/6.jpg' srcset='img/about/slide/6@2x.jpg 2x')
      img.carousel-cell(alt='ワークショップの様子' src='img/about/slide/7.jpg' srcset='img/about/slide/7@2x.jpg 2x')
      img.carousel-cell(alt='ワークショップの様子' src='img/about/slide/8.jpg' srcset='img/about/slide/8@2x.jpg 2x')
  section#dna-barcoding
    h2
      img(alt='解析方法（DNAバーコーディング）について' src='img/about/title-dna_barcoding.png' srcset='img/about/title-dna_barcoding@2x.png 2x')
    p
      | すべての生き物が、それぞれのDNAを持っています。DNAは生き物の設計情報を記録している物質です。生き物のDNAに書かれている情報の一部を読み取り、既に知られているDNAの情報と照らし合わせることで、ある程度、種名を調べる事ができるようになってきています。この技術は「DNAバーコーディング」と呼ばれており、専門家以外でも種の特定を可能とする技術として取り組みが広がってきています。<br>
      | 今回のプロジェクトでは、実際に森で採集した生き物からDNAを取り出し、植物・昆虫・菌類それぞれに標準化されたDNA情報を用いて、データベース上で検索を行い、生物種の特定を試みました。具体的には、植物では葉緑体のrbcLやmatK、昆虫ではミトコンドリアのCOI、菌類ではITSと呼ばれる領域のDNAを利用しました。<br>
      | また、検索にはバイオインフォマティクスでDNAの類似した部分を並べて照らし合わせることができる「<a class="border" href="https://blast.ncbi.nlm.nih.gov/Blast.cgi" target="_blank">BLAST</a>」と呼ばれるプログラムを利用しました。
  section
    h2
      img(alt='仁保の森について' src='img/about/title-niho_forest.png' srcset='img/about/title-niho_forest@2x.png 2x')
    p
      | YCAMから車で約30分、山口市仁保上郷（にほ かみごう）にある森。森の奥には落差20メートルの「犬鳴（いぬなき）の滝」があり、そこから流れる川は森と里をつなぎ、仁保川に流れ込んでいます。山や里によくいる生き物に加えて渓流系の生き物も住んでいる豊かな森であり、典型的な山口の里山の風景が広がっています。

  section#credit
    h3#produce
      img(alt='企画・制作' src='img/about/title-produce.png' srcset='img/about/title-produce@2x.png 2x')
    a(href="http://www.ycam.jp/projects/ycam-bio-research/" target="_blank")
      h4
        img(alt='YCAM バイオ・リサーチ' src='img/about/ycam-bioresearch.png' srcset='img/about/ycam-bioresearch@2x.png 2x')
      p
        | 高原 文江　津田 和俊　朴 鈴子　伊藤 隆之　菅沼 聖<br>
        | 「YCAM バイオ・リサーチ」は、バイオテクノロジーの応用可能性を<br>
        | 多様な切り口で模索するYCAMのプロジェクトです
    a(href="http://www.ycam.jp/projects/ycam-bio-research/" target="_blank")
      h4
        img(alt='「もしも、森の生き物になったら」チーム' src='img/about/iteota.png' srcset='img/about/iteota@2x.png 2x')
      p
        | Ersinhan Ersin, Christina Tarquini, Ben Larthe, Antoine Bertin,<br>
        | 竹下 暁子, Clarence Ng, 三浦 陽平, 北堀 あすみ
    h3#support
      img(alt='制作・協力' src='img/about/title-support.png' srcset='img/about/title-support@2x.png 2x')
    p
      | <a href="http://www.yamahaku.pref.yamaguchi.lg.jp/" target="_blank">講師：田中 浩（山口県立博物館動物担当理学博士）</a><br>
      | <a href="http://karappo.net" target="_blank">図鑑ウェブ制作：KARAPPO Inc.</a><br>
      | <a href="http://www.antoinebertin.org/" target="_blank">録音・音源編集：Antoine Bertin（antoinebertin.org）</a><br>
      | <a href="http://www.solar-hofu.sakura.ne.jp/" target="_blank">スマホ顕微鏡技術協力：寺田 勉（防府市青少年科学館ソラール館長）</a><br>
      | <a href="https://www.facebook.com/groups/life.is.small/" target="_blank">スマホ顕微鏡普及団体：Life is small Project</a>

</template>

<style lang="sass?indentedSyntax">

=dotted($pos: left,$color:rgba(#000, 1.0), $stripe: 1, $spacing: 4, $width:1)
  border: none
  @if $pos == left or $pos == right
    background: linear-gradient(to bottom,$color 0%,$color $stripe/($stripe+$spacing)*100%,transparent $stripe/($stripe+$spacing)*100%,transparent 100%)
    background-repeat: repeat-y
    background-size: ($width)*1px ($stripe+$spacing)*1px
    background-position: $pos ($stripe)*1px
  @else if $pos == top or $pos == bottom
    background: linear-gradient(to left,$color 0%,$color $stripe/($stripe+$spacing)*100%,transparent $stripe/($stripe+$spacing)*100%,transparent 100%)
    background-repeat: repeat-x
    background-size: ($stripe+$spacing)*1px ($width)*1px
    background-position: ($stripe)*1px $pos

article.about
  height: 100%
  overflow-y: auto
  h1
    text-align: center
    margin-top: 68px
    margin-bottom: 68px
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
    text-align: justify
  a
    color: inherit
    text-decoration: none
  a.border
    +dotted(bottom, #808080, 1, 3)
    display: inline-block
    &:hover
      opacity: 1
      +dotted(bottom, #fff, 1, 3)
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
      h3#produce
        margin-bottom: 53px
      h3#support
        margin-bottom: 40px
        margin-top: 80px
      >a
        display: block
        width: 570px
        margin: 0 auto
        &:hover
          opacity: 0.7
      p
        text-align: center
        a
          color: inherit
          text-decoration: none
          &:hover
            opacity: 0.7
      h4
        margin-bottom: 10px

  .carousel
    width: 760px
    height: 506px
    margin: 50px -80px 200px
    // .flickity-viewport
    //   border-radius: 20px !important
    //   overflow: hidden !important
    // 上記で角丸にするとスライド中に効かないのでしょうがなく、下のように画像を重ねて代用
    &:before
      content: url(/dna-of-forests/img/about/slide-round.png)
      width: 100%
      height: 100%
      position: absolute
      z-index: 10
      left: 0
      pointer-events: none
    .carousel-cell
      width: 100%
      height: 100%
      margin-right: 0
    .flickity-page-dots
      bottom: -38px
      .dot
        width: 7px
        height: 7px
        background-color: #fff
        opacity: 0.3
        margin: 0 6px
        &.is-selected
          opacity: 1
    .flickity-prev-next-button
      outline: 0
      height: 100%
      border-radius: 0
      transition-duration: 0.2s
      opacity: 0
      background: transparent
      width: 80px
      .arrow
        fill: #fff
      svg
        left: calc(50% - 20px)
        top: calc(50% - 20px)
        width: 40px
        height: auto
      &.next
        right: 0
      &.previous
        left: 0
      &:not([disabled]):active
        .arrow
          opacity: 0.5
      &[disabled]
        display: none
    &:hover
      .flickity-prev-next-button:not([disabled])
        opacity: 1

</style>

<script>

import Vue from 'vue';
import Flickity from 'flickity';

export default Vue.extend({
  mounted: function() {
    console.log('ready');
    var elem = document.querySelector('.carousel');
    var flkty = new Flickity( elem, {
      autoPlay: true,
      wrapAround: true
    });
  }
});

</script>