# Changelog

## [0.8.2](https://github.com/lut3k-IT/aot-app/compare/v0.8.1...v0.8.2) (2026-02-22)


### Performance Improvements

* optimize data helpers with Map lookups and WeakMap cache ([edd77e7](https://github.com/lut3k-IT/aot-app/commit/edd77e7422cd0bd108973e6ac6ac8c640551b843))

## [0.8.1](https://github.com/lut3k-IT/aot-app/compare/v0.8.0...v0.8.1) (2026-01-26)


### Bug Fixes

* **changelog:** read from root file and display all versions ([8fcb8fc](https://github.com/lut3k-IT/aot-app/commit/8fcb8fc0a0afa24db470b0bb24d2e74a51c6704a))

## [0.8.0](https://github.com/lut3k-IT/aot-app/compare/v0.7.0...v0.8.0) (2026-01-26)


### Features

* **app:** improve seo, add sitemap and restructure heroes routing ([c7752c6](https://github.com/lut3k-IT/aot-app/commit/c7752c6f375ea09bfa33189fb85a0159f48da1e8))
* **charts:** Add click interactions with gallery filters and spoiler protection for status chart ([30ab23a](https://github.com/lut3k-IT/aot-app/commit/30ab23ae44bce6c3c0021554a7654a53b4ca8ec3))
* **charts:** Add residence and status distribution charts ([fdbf7a3](https://github.com/lut3k-IT/aot-app/commit/fdbf7a3eda906510308780bcbc2800077743b403))
* **i18n:** enable language detection and internationalize landing page ([1cafc0c](https://github.com/lut3k-IT/aot-app/commit/1cafc0c742d0c60c9a5f0648d6ac09dec8461840))
* **navigation:** improve active states and add hover effects ([d4dd5d4](https://github.com/lut3k-IT/aot-app/commit/d4dd5d45d53cfd1b1c5d5b00edbfa4d1b39a25d4))


### Bug Fixes

* **navigation:** highlight heroes tab on comparisons and charts pages ([385b7c8](https://github.com/lut3k-IT/aot-app/commit/385b7c89c9c700ee46363bad137dca8a1403b55e))
* **quiz:** adjust layout spacing and fix answer button styles ([6bf6e23](https://github.com/lut3k-IT/aot-app/commit/6bf6e237b28275995f0a3c400d32345a4959da50))
* **ui:** fix hydration errors, heroes comparison crash and mobile touch events ([ea551e7](https://github.com/lut3k-IT/aot-app/commit/ea551e73f0ab41f460f92b75da8f761a305b63c5))
* **ui:** handle missing hero images to prevent 404 errors ([cd76d2e](https://github.com/lut3k-IT/aot-app/commit/cd76d2e4d162a65bc35a8d02956aa5aaec7ac31b))
* **ui:** synchronize app version with package.json ([354fd65](https://github.com/lut3k-IT/aot-app/commit/354fd65a1e75afa75154330781299c9f479cc461))


### Performance Improvements

* optimize splash screen image and mbti chart rendering ([8503962](https://github.com/lut3k-IT/aot-app/commit/850396218dd9eaca41d5b73b2b1d84124c1f981d))
* **ui:** optimize buymeacoffee button with next/image ([d23cdf3](https://github.com/lut3k-IT/aot-app/commit/d23cdf344717d070de38a5499b0b690b68597397))

## [0.7.0](https://github.com/lut3k-IT/aot-app/compare/v0.6.1...v0.7.0) (2026-01-25)


### Features

* new quiz questions ([ffa4619](https://github.com/lut3k-IT/aot-app/commit/ffa46197c25cbac0b747ddd8071c2fee8169dba3))
* **quiz:** redesign ui with animations and enhanced result screen ([d36bc47](https://github.com/lut3k-IT/aot-app/commit/d36bc47a38cae0e66ab85b6c919130d6e0cea06c))
* **ui:** add fade out animation to splash screen ([49ee035](https://github.com/lut3k-IT/aot-app/commit/49ee0354e4f2f15c571c7479c4e2869cdcfdc234))
* update to React 19 ([41fb116](https://github.com/lut3k-IT/aot-app/commit/41fb1160ee60dd5cf129ff6f35d9413b24dc5a84))


### Bug Fixes

* **quiz:** fix disappearing buttons on language change ([b252dc2](https://github.com/lut3k-IT/aot-app/commit/b252dc27aef4da204c0f7a820c42e9bb426de0cb))
* **quotations:** remove invalid translation key from page title ([d3a9415](https://github.com/lut3k-IT/aot-app/commit/d3a9415d3f9576c4eba37525541112bdd4330bc0))
* remove forwardRef ([d753eda](https://github.com/lut3k-IT/aot-app/commit/d753edaa6ca3c8c55577b4965b124cdbee8d000d))

## [0.6.1](https://github.com/lut3k-IT/aot-app/compare/v0.6.0...v0.6.1) (2026-01-19)


### Bug Fixes

* **ui:** add unoptimized prop to CharacterPicture to resolve image loading errors ([62a31c6](https://github.com/lut3k-IT/aot-app/commit/62a31c655c03ac6ab6aa217a29e13274ba16c55f))

## [0.6.0](https://github.com/lut3k-IT/aot-app/compare/v0.5.1...v0.6.0) (2026-01-19)


### Features

* **agent-rules:** add project rules definition file ([c4f4cd7](https://github.com/lut3k-IT/aot-app/commit/c4f4cd739d0b1b2ffcc9d40028719e2a01f2c40b))
* **landing:** add landing page FAQ, features, about sections and footer ([cb4a2bd](https://github.com/lut3k-IT/aot-app/commit/cb4a2bd35ca6063574dfe5d8626438515980d3fc))
* migrate from Vite to Next.js 14+ with App Router ([4e85688](https://github.com/lut3k-IT/aot-app/commit/4e85688a829c49f104fab4b4ff9c2349ec9f875e))


### Bug Fixes

* **app:** resolve hydration errors and implement dynamic page titles ([c0c7bb9](https://github.com/lut3k-IT/aot-app/commit/c0c7bb9082fecd49a91d736febdc048955723306))

## [0.5.1](https://github.com/lut3k-IT/aot-app/compare/v0.5.0...v0.5.1) (2025-12-23)


### Bug Fixes

* changelog and articles new style ([57b095c](https://github.com/lut3k-IT/aot-app/commit/57b095c760e6c9eefcc404c6940cc2b729e8bb3a))
* clear changelog to generate new one ([0b37f52](https://github.com/lut3k-IT/aot-app/commit/0b37f52a5f27331b3d99d3e7131684d4bab3524a))

## [0.5.0](https://github.com/lut3k-IT/aot-app/compare/v0.4.0...v0.5.0) (2025-12-23)


### Features

* implement PWA ([350857a](https://github.com/lut3k-IT/aot-app/commit/350857a250e344aa660b0ee7b26d37510378f4d0))
* PWA update prompt with image caching ([8efe2b5](https://github.com/lut3k-IT/aot-app/commit/8efe2b59b3b45ae72ed03982bd1f5a2c38cc84a4))

## [0.4.0](https://github.com/lut3k-IT/aot-app/compare/v0.3.0...v0.4.0) (2025-12-19)


### Features

* Add automated app versioning ([f0e4761](https://github.com/lut3k-IT/aot-app/commit/f0e476153acc0ce079570fd79904c21084d77417))
* Add changelog page ([225dbc0](https://github.com/lut3k-IT/aot-app/commit/225dbc0b0e1c8ef1a7728017cb996ef625c6fb7c))
* Add quiz animations and best score ([4cf47bd](https://github.com/lut3k-IT/aot-app/commit/4cf47bd09a606b6d4f83d1e4d7c047fe11498f23))
* Add robots.txt and sitemap.xml for SEO ([18bbbf8](https://github.com/lut3k-IT/aot-app/commit/18bbbf81433907997d8200973d944d7952dcef0c))
* add SPA fallback redirect for client-side routing ([a49804f](https://github.com/lut3k-IT/aot-app/commit/a49804f5b0d6d93a0eb40f8d30b326e8250d5c40))
* add splash screen ([4e8a9a4](https://github.com/lut3k-IT/aot-app/commit/4e8a9a4146c51b7d0d1822762c8e61c54bbe3fe2))
* add test coverage ([d161d7e](https://github.com/lut3k-IT/aot-app/commit/d161d7e6f42c73ffa6dc3e36780cf17729d8e284))
* application versioning ([6573e9c](https://github.com/lut3k-IT/aot-app/commit/6573e9cb91985ca2cf7f26b09c028cc81ef56012))
* Enhance quiz functionality ([0c05e9c](https://github.com/lut3k-IT/aot-app/commit/0c05e9c5dc2da3e93aaff777bbb84dc47566f7fe))
* Internationalize quotations ([65d4799](https://github.com/lut3k-IT/aot-app/commit/65d4799c41612c9e6b777a5345a17f2b06e05c33))
* Optimize application performance ([2ffe4cb](https://github.com/lut3k-IT/aot-app/commit/2ffe4cb05c0e66a54fd5195459f2ee139cdd18b0))
* Replace `commit-and-tag-version` with `release-please` GitHub Actions workflow. ([8e70678](https://github.com/lut3k-IT/aot-app/commit/8e706783ca599c4b173fc26e2df7b084c8b46cea))


### Bug Fixes

* Address feedback on quiz styling and translations ([41b20b5](https://github.com/lut3k-IT/aot-app/commit/41b20b5224d6baa62c8a936a1cdad53bffa4ec45))
* **comparison:** select bug ([abd490e](https://github.com/lut3k-IT/aot-app/commit/abd490e4f18a7bf393a409923e57129294dbf987))
* **deps:** missing 'numeral' dep ([b28784f](https://github.com/lut3k-IT/aot-app/commit/b28784f37194a3c16c5bac00bb07d0ea7afa0b5c))
* **heroes:** Clear search params on tab change ([a3cd472](https://github.com/lut3k-IT/aot-app/commit/a3cd4720eca68b5fd38ee6a3ad6d39a953dc429e))
* **heroes:** resolve filter state bug on re-navigation ([278cde0](https://github.com/lut3k-IT/aot-app/commit/278cde0307c921ea4d14b7f8e239203978d2c698))
* **spoiler-mode:** language persist on language change bug ([e43b722](https://github.com/lut3k-IT/aot-app/commit/e43b722a77d306ef38a9ad7297bada2322257350))
* wrong icon name ([5ea7e08](https://github.com/lut3k-IT/aot-app/commit/5ea7e08b2b7ab33e9cd16652b82d27a57b4238ea))

## [0.3.0](https://github.com/lut3k-IT/aot-app/compare/v0.2.1...v0.3.0) (2025-11-19)


### Features

* Add robots.txt and sitemap.xml for SEO ([18bbbf8](https://github.com/lut3k-IT/aot-app/commit/18bbbf81433907997d8200973d944d7952dcef0c))
* add SPA fallback redirect for client-side routing ([a49804f](https://github.com/lut3k-IT/aot-app/commit/a49804f5b0d6d93a0eb40f8d30b326e8250d5c40))
* add test coverage ([d161d7e](https://github.com/lut3k-IT/aot-app/commit/d161d7e6f42c73ffa6dc3e36780cf17729d8e284))
* Replace `commit-and-tag-version` with `release-please` GitHub Actions workflow. ([8e70678](https://github.com/lut3k-IT/aot-app/commit/8e706783ca599c4b173fc26e2df7b084c8b46cea))


### Bug Fixes

* **heroes:** Clear search params on tab change ([a3cd472](https://github.com/lut3k-IT/aot-app/commit/a3cd4720eca68b5fd38ee6a3ad6d39a953dc429e))

## [0.2.1](https://github.com/lut3k-IT/aot-app/compare/v0.2.0...v0.2.1) (2025-10-15)


### Bug Fixes

* **heroes:** resolve filter state bug on re-navigation ([278cde0](https://github.com/lut3k-IT/aot-app/commit/278cde0307c921ea4d14b7f8e239203978d2c698))


### Features

* Optimize application performance ([2ffe4cb](https://github.com/lut3k-IT/aot-app/commit/2ffe4cb05c0e66a54fd5195459f2ee139cdd18b0))



## [0.2.0](https://github.com/lut3k-IT/aot-app/compare/v0.1.0...v0.2.0) (2025-10-15)


### Bug Fixes

* Address feedback on quiz styling and translations ([41b20b5](https://github.com/lut3k-IT/aot-app/commit/41b20b5224d6baa62c8a936a1cdad53bffa4ec45))
* **comparison:** select bug ([abd490e](https://github.com/lut3k-IT/aot-app/commit/abd490e4f18a7bf393a409923e57129294dbf987))


### Features

* Add quiz animations and best score ([4cf47bd](https://github.com/lut3k-IT/aot-app/commit/4cf47bd09a606b6d4f83d1e4d7c047fe11498f23))
* Enhance quiz functionality ([0c05e9c](https://github.com/lut3k-IT/aot-app/commit/0c05e9c5dc2da3e93aaff777bbb84dc47566f7fe))
* Internationalize quotations ([65d4799](https://github.com/lut3k-IT/aot-app/commit/65d4799c41612c9e6b777a5345a17f2b06e05c33))



## [0.0.2](https://github.com/lut3k-IT/aot-app/compare/v0.0.1...v0.0.2) (2024-06-20)


### Bug Fixes

* **deps:** missing 'numeral' dep ([b28784f](https://github.com/lut3k-IT/aot-app/commit/b28784f37194a3c16c5bac00bb07d0ea7afa0b5c))
* **spoiler-mode:** language persist on language change bug ([e43b722](https://github.com/lut3k-IT/aot-app/commit/e43b722a77d306ef38a9ad7297bada2322257350))



## [0.0.1](https://github.com/lut3k-IT/aot-app/compare/6573e9cb91985ca2cf7f26b09c028cc81ef56012...v0.0.1) (2024-06-20)


### Bug Fixes

* wrong icon name ([5ea7e08](https://github.com/lut3k-IT/aot-app/commit/5ea7e08b2b7ab33e9cd16652b82d27a57b4238ea))


### Features

* Add automated app versioning ([f0e4761](https://github.com/lut3k-IT/aot-app/commit/f0e476153acc0ce079570fd79904c21084d77417))
* Add changelog page ([225dbc0](https://github.com/lut3k-IT/aot-app/commit/225dbc0b0e1c8ef1a7728017cb996ef625c6fb7c))
* application versioning ([6573e9c](https://github.com/lut3k-IT/aot-app/commit/6573e9cb91985ca2cf7f26b09c028cc81ef56012))


### Reverts

* Revert "chore(release): 0.0.1" ([f2e22bd](https://github.com/lut3k-IT/aot-app/commit/f2e22bd3f72fe99324651ae5bac7d19687b4142b))
