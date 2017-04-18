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
    h3#planning_production
      imgr(:alt="$t('about.planning_production')" src='about/title-planning_production.png' locale)
    a(href="http://www.ycam.jp/projects/ycam-bio-research/" target="_blank")
      h4
        imgr(:alt="$t('about.ycam-bioresearch.title')" src='about/ycam-bioresearch.png' locale)
      p(v-html="$t('about.ycam-bioresearch.body')")
    a(href="http://www.ycam.jp/events/2016/in-the-eyes-of-the-animal/" target="_blank")
      h4
        imgr(:alt="$t('about.iteota.title')" src='about/iteota.png' locale)
      p(v-html="$t('about.iteota.body')")
    a(href="http://www.ycam.jp/" target="_blank")
      h4
        imgr(:alt="$t('about.ycam.title')" src='about/ycam.png' locale)
      p(v-html="$t('about.ycam.body')")
    h3#production
      imgr(:alt="$t('about.production')" src='about/title-production.png' locale)
    p
      | <a href="http://www.yamahaku.pref.yamaguchi.lg.jp/" target="_blank">{{ $t('about.tanaka') }}</a><br>
      | <a href="http://karappo.net" target="_blank">{{ $t('about.karappo') }}</a><br>
      | <a href="http://www.antoinebertin.org/" target="_blank">{{ $t('about.antoine') }}</a><br>
    h3#cooperation
      imgr(:alt="$t('about.cooperation')" src='about/title-cooperation.png' locale)
    p.small(v-html="$t('about.cooperations')")

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
      h3#planning_production
        margin-bottom: 53px
      h3#production,
      h3#cooperation
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

html[lang=en]
  article.about
    h2
      margin-bottom: 50px
    p
      font-size: 15px
      line-height: 2.2em
      letter-spacing: 0.1em
      color: #cacaca
    section
      width: 600px
      &#credit
        >a
          width: 630px
      &#credit
        h3#planning_production
          margin-bottom: 49px
        h3#production,
        h3#cooperation
          margin-top: 114px
          margin-bottom: 33px
        h4
          margin-bottom: 12px
        >a
          margin-bottom: 44px

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
  html[lang=en]
    article.about
      section
        p
          padding-left: 40px
          padding-right: 40px

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