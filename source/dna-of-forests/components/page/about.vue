<template lang="pug">

article.about
  h1
    imgr(:alt="$t('about.logo')" src='about/logo.png' locale)

  section#about
    h2
      imgr(:alt="$t('about.about.title')" src='about/title-about.png' locale)
    p(v-html="$t('about.about.body')")
    .carousel
      .carousel-cell(style='background-image: url(/dna-of-forests/img/about/slide/9.jpg);')
      .carousel-cell(style='background-image: url(/dna-of-forests/img/about/slide/10.jpg);')
      .carousel-cell(style='background-image: url(/dna-of-forests/img/about/slide/1.jpg);')
      .carousel-cell(style='background-image: url(/dna-of-forests/img/about/slide/2.jpg);')
      .carousel-cell(style='background-image: url(/dna-of-forests/img/about/slide/3.jpg);')
      .carousel-cell(style='background-image: url(/dna-of-forests/img/about/slide/4.jpg);')
      .carousel-cell(style='background-image: url(/dna-of-forests/img/about/slide/5.jpg);')
      .carousel-cell(style='background-image: url(/dna-of-forests/img/about/slide/6.jpg);')
      .carousel-cell(style='background-image: url(/dna-of-forests/img/about/slide/7.jpg);')
      .carousel-cell(style='background-image: url(/dna-of-forests/img/about/slide/8.jpg);')
    center.credit {{ $t('about.about.credit') }}
  section#dna_barcoding
    h2
      imgr(:alt="$t('about.dna_barcoding.title')" src='about/title-dna_barcoding.png' locale)
    p(v-html="$t('about.dna_barcoding.body')")
  section#niho_forest
    h2
      imgr(:alt="$t('about.niho_forest.title')" src='about/title-niho_forest.png' locale)
    p(v-html="$t('about.niho_forest.body')")
  section#credit
    h3#produce
      imgr(alt='企画・制作' src='about/title-produce.png' locale)
    a(href="http://www.ycam.jp/projects/ycam-bio-research/" target="_blank")
      h4
        imgr(alt='YCAM バイオ・リサーチ' src='about/ycam-bioresearch.png' locale)
      p
        | 高原 文江　津田 和俊　朴 鈴子　伊藤 隆之　菅沼 聖<br>
        | （山口情報芸術センター［YCAM］）<br>
        | 「YCAM バイオ・リサーチ」は、バイオテクノロジーの応用可能性を<br>
        | 多様な切り口で模索するYCAMのプロジェクトです
    a(href="http://www.ycam.jp/events/2016/in-the-eyes-of-the-animal/" target="_blank")
      h4
        imgr(alt='「もしも、森のいきものになったら」チーム' src='about/iteota.png' locale)
      p
        | Ersinhan Ersin　Christina Tarquini　Ben Larthe　Antoine Bertin<br>
        | （マシュマロ・レーザー・フィースト）<br>
        | 竹下 暁子　Clarence Ng　三浦 陽平　北堀 あすみ<br>
        | （山口情報芸術センター［YCAM］）
    a(href="http://www.ycam.jp/" target="_blank")
      h4
        imgr(alt='山口情報芸術センター［YCAM］' src='about/ycam.png' locale)
      p Yamaguchi Center for Arts and Media
    h3#create
      imgr(alt='制作' src='about/title-create.png' locale)
    p
      | <a href="http://www.yamahaku.pref.yamaguchi.lg.jp/" target="_blank">講師：田中 浩（山口県立博物館動物担当理学博士）</a><br>
      | <a href="http://karappo.net" target="_blank">図鑑ウェブ制作：KARAPPO Inc.</a><br>
      | <a href="http://www.antoinebertin.org/" target="_blank">録音・音源編集：Antoine Bertin（antoinebertin.org）</a><br>
    h3#support
      imgr(alt='協力' src='about/title-support.png' locale)
    p.small
      | スマホ顕微鏡開発者：永山國昭(生理学研究所名誉教授、総合研究大学院大学理事）<br>
      | 伊藤俊幸（元生理学研究所技術員、LisCo社員）<br>
      | <a href="https://www.facebook.com/groups/life.is.small/" target="_blank">スマホ顕微鏡普及団体：Life is small Project</a><br>
      | <a href="http://www.solar-hofu.sakura.ne.jp/" target="_blank">スマホ顕微鏡技術協力：寺田 勉（防府市青少年科学館ソラール館長）</a><br>
      | 現地協力：仁保自治会<br>
      | レーザースキャニング技術協力：東北大学災害科学国際研究所、山口大学<br>
      | <br>
      | 主催：山口市、公益財団法人山口市文化振興財団<br>
      | 後援：山口市教育委員会、ブリティッシュ・カウンシル<br>
      | 助成：平成28年度文化庁劇場・音楽堂等活性化事業

</template>

<style lang="sass?indentedSyntax">

article.about
  height: 100%
  overflow-y: auto
  overflow-x: hidden
  h1
    text-align: center
    margin-top: 130px
    margin-bottom: 130px
  h2
    text-align: center
    margin-bottom: 38px
  h3
    text-align: center
    margin-bottom: 24px
  p
    font-size: 15px
    line-height: 2.2em
    letter-spacing: 0.05em
    text-align: left
    margin-bottom: 2.2em
    text-align: justify
  a
    color: inherit
    text-decoration: none
  section
    width: 620px
    margin: 0 auto
    text-align: center
    margin-bottom: 96px
    &#credit
      width: auto
      background-color: #191919
      padding: 108px 0
      margin-bottom: 0
      h3#produce
        margin-bottom: 53px
      h3#create,
      h3#support
        margin-bottom: 40px
        margin-top: 80px
      >a
        display: block
        width: 600px
        margin: 0 auto 40px
        &:hover
          opacity: 0.7
      p
        font-size: 14px
        text-align: center
        a
          color: inherit
          text-decoration: none
          &:hover
            opacity: 0.7
            cursor: pointer
        &.small
          font-size: 12px

      h4
        margin-bottom: 10px

  .carousel
    width: 760px
    height: 506px
    margin: 50px -80px 38px
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
      background-position: center
      background-size: cover
    .flickity-page-dots
      bottom: -60px
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

  // 撮影クレジット
  center.credit
    margin-top: -26px
    color: #696969
    font-size: 12px
    font-weight: bold

@media (max-width: 900px)
  article.about
    section
      width: 100%
      p
        padding-left: 50px
        padding-right: 50px
        font-size: 18px
      .carousel
        width: 100%
        margin-left: 0
        margin-right: 0
        &:before
          display: none

</style>

<script>

import Vue from 'vue';
import Flickity from 'flickity';

export default Vue.extend({
  mounted: function() {
    var elem = document.querySelector('.carousel');
    new Flickity( elem, {
      autoPlay: true,
      wrapAround: true
    });
  }
});

</script>