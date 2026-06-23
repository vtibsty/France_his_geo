<script setup>
import { computed, onMounted, ref } from 'vue'

const heroImage = '/assets/generated/france-history-hero.png'
const geographyImage = '/assets/generated/france-physical-geography.png'
const colonialRoutesImage = '/assets/generated/france-colonial-routes.png'

const periods = [
  {
    id: 'gaul',
    range: '公元前 600 - 486',
    nav: '高卢与罗马',
    title: '高卢、罗马道路与早期城市网络',
    kicker: '从凯尔特高卢到罗马高卢',
    image: '/assets/history/gaul-tribes.png',
    imageTitle: '高卢部族与城镇示意图',
    source: 'Wikimedia Commons / Map Gallia Tribes Towns',
    sourceUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Map%20Gallia%20Tribes%20Towns.png',
    summary:
      '法国历史的地理底层首先形成于高卢。凯尔特部族沿河谷、山地和贸易路网分布；凯撒征服高卢后，罗马道路、城市、拉丁语和行省制度把塞纳河、罗讷河、卢瓦尔河沿线纳入同一政治空间。',
    geography: ['塞纳河与卢瓦尔河流域成为内陆交通骨架', '罗讷河谷连接地中海与北方', '阿尔卑斯与比利牛斯塑造南东边界'],
    territory: '罗马高卢不是现代法国，但它提供了后来的城市、道路和行政记忆。',
    overseas: '无近代海外殖民地；影响主要来自地中海贸易和罗马帝国网络。',
    places: ['马赛', '里昂', '卢泰西亚', '阿尔勒']
  },
  {
    id: 'franks',
    range: '486 - 987',
    nav: '法兰克',
    title: '法兰克王国与西欧政治核心的形成',
    kicker: '从克洛维到查理曼',
    image: '/assets/history/charlemagne-durer.jpg',
    imageTitle: '丢勒笔下的查理曼肖像',
    source: 'Wikimedia Commons / Albrecht Durer',
    sourceUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Charlemagne%20by%20Durer.jpg',
    summary:
      '法兰克人从高卢北部扩张，克洛维皈依天主教使王权与教会结合。查理曼帝国短暂覆盖西欧大部，843 年凡尔登条约后，西法兰克逐渐成为法国政治共同体的前身。',
    geography: ['巴黎盆地开始成为权力重心', '莱茵河方向成为法德空间竞争的长期轴线', '北部平原便于军队与王权扩张'],
    territory: '西法兰克不是边界清晰的民族国家，而是王权、贵族领地和教会网络交织的空间。',
    overseas: '无海外殖民体系；欧洲大陆影响力来自帝国遗产与教会联盟。',
    places: ['兰斯', '巴黎', '亚琛', '图尔']
  },
  {
    id: 'capet',
    range: '987 - 1453',
    nav: '卡佩王权',
    title: '卡佩王朝、巴黎盆地与王室领地扩张',
    kicker: '中世纪法国的空间整合',
    image: '/assets/history/reims-cathedral.jpg',
    imageTitle: '兰斯大教堂，法国王权加冕记忆中心',
    source: 'Wikimedia Commons / Reims Cathedral',
    sourceUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Exterior%20view%20of%20the%20west%20facade%20of%20Notre-Dame%20Cathedral%20in%20Reims.jpg',
    summary:
      '卡佩王朝最初控制的王室领地有限，但巴黎、奥尔良和塞纳-卢瓦尔通道让王权能够持续向外整合。百年战争使英法争夺从王朝继承问题转化为更强烈的政治共同体意识。',
    geography: ['巴黎位于河流与道路交汇处', '诺曼底、阿基坦、勃艮第等大封地左右王权边界', '英吉利海峡成为英法战争的地缘前线'],
    territory: '王室领地逐步压过诸侯封地，现代法国本土轮廓开始出现。',
    overseas: '十字军和地中海联系存在，但尚未形成全球殖民体系。',
    places: ['巴黎', '兰斯', '奥尔良', '鲁昂']
  },
  {
    id: 'war',
    range: '1453 - 1610',
    nav: '王国整合',
    title: '百年战争之后：布列塔尼、勃艮第与边疆整合',
    kicker: '走向近代王国',
    image: '/assets/history/france-1477-local.svg',
    imageTitle: '15 世纪后期法国及周边势力示意',
    source: 'Wikimedia Commons / Historical map',
    sourceUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/France%201477-en.svg',
    summary:
      '百年战争结束后，法国王权继续整合西部、东部和南部边疆。布列塔尼通过王室联姻纳入法国，勃艮第遗产问题强化了法国与哈布斯堡势力的长期对抗。',
    geography: ['布列塔尼控制大西洋伸出的半岛门户', '勃艮第位于巴黎盆地与莱茵方向之间', '卢瓦尔河谷成为王室与文艺复兴文化走廊'],
    territory: '本土边界向现代轮廓靠近，但东北、东南边疆仍长期变化。',
    overseas: '远洋探索开始，法国逐渐进入大西洋竞争。',
    places: ['南特', '第戎', '图尔', '波尔多']
  },
  {
    id: 'ancien',
    range: '1610 - 1789',
    nav: '绝对王权',
    title: '绝对王权、自然边界与第一殖民帝国',
    kicker: '凡尔赛与大西洋世界',
    image: '/assets/history/versailles-atlas.svg',
    imageTitle: '凡尔赛镜厅，绝对王权的空间象征',
    source: 'Wikimedia Commons / Palace of Versailles',
    sourceUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Chateau%20de%20Versailles%20Galerie%20des%20Glaces.jpg',
    summary:
      '波旁王朝以巴黎和凡尔赛为中心强化行政国家。法国向莱茵、阿尔卑斯、比利牛斯等“自然边界”想象推进，同时在加拿大、路易斯安那、加勒比和印度洋建立第一殖民帝国。',
    geography: ['莱茵方向成为东部防线想象', '大西洋港口连接奴隶贸易、糖业和殖民贸易', '地中海与马赛维持南部商业门户'],
    territory: '阿尔萨斯、弗朗什-孔泰、鲁西永等地相继进入法国王国。',
    overseas: '第一殖民帝国覆盖新法兰西、加勒比种植园、印度据点和印度洋岛屿。',
    places: ['凡尔赛', '马赛', '南特', '魁北克']
  },
  {
    id: 'revolution',
    range: '1789 - 1815',
    nav: '革命与帝国',
    title: '大革命、行政重划与拿破仑欧洲',
    kicker: '从旧制度到民族国家',
    image: '/assets/history/bastille-cholat.jpg',
    imageTitle: '攻占巴士底狱',
    source: 'Wikimedia Commons / Prise de la Bastille',
    sourceUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Siege%20of%20the%20Bastille%20(Claude%20Cholat).jpg',
    summary:
      '革命废除旧制度特权，以省份之外的“省级行政区”重绘国家空间。拿破仑帝国把法国制度和军事影响推向欧洲大陆，但海地独立与路易斯安那出售显示海外帝国的重大收缩。',
    geography: ['行政区划重组弱化旧省份身份', '莱茵、意大利和低地成为帝国扩张方向', '圣多明各革命改变加勒比殖民格局'],
    territory: '法国本土与附庸体系一度覆盖欧洲大陆核心地带，1815 年后回落。',
    overseas: '圣多明各独立为海地，路易斯安那出售给美国，第一殖民帝国受重创。',
    places: ['巴黎', '瓦尔密', '奥斯特里茨', '圣多明各']
  },
  {
    id: 'third',
    range: '1815 - 1945',
    nav: '第二殖民帝国',
    title: '第三共和国、阿尔萨斯-洛林与第二殖民帝国',
    kicker: '工业化、边疆与全球扩张',
    image: '/assets/history/colonial-empire.png',
    imageTitle: '法国殖民帝国地图',
    source: 'Wikimedia Commons / French colonial empire map',
    sourceUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/EmpireFrench.png',
    summary:
      '19 世纪法国在王政、帝国和共和国之间转换，同时巴黎工业化与城市改造加速。1871 年失去阿尔萨斯-洛林后，东北边疆成为民族记忆核心；阿尔及利亚、法属西非、印度支那和马达加斯加构成第二殖民帝国。',
    geography: ['阿尔萨斯-洛林位于莱茵门户与工业带', '北非与西非扩张依赖地中海和撒哈拉边缘通道', '印度支那连接南海与湄公河流域'],
    territory: '本土边疆因德法战争和两次世界大战剧烈震荡。',
    overseas: '第二殖民帝国在 20 世纪初达到高峰，覆盖非洲、亚洲、太平洋和加勒比多个区域。',
    places: ['巴黎', '斯特拉斯堡', '阿尔及尔', '河内']
  },
  {
    id: 'modern',
    range: '1945 - 至今',
    nav: '第五共和国',
    title: '去殖民化、欧洲一体化与现代海外领土',
    kicker: '从帝国到全球法国',
    image: '/assets/history/republic-memory.svg',
    imageTitle: '巴黎凯旋门，现代共和国国家记忆空间',
    source: 'Wikimedia Commons / Arc de Triomphe',
    sourceUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Paris%20Arc%20de%20Triomphe%20at%20night.jpg',
    summary:
      '二战后法国重建共和国制度，戴高乐建立第五共和国。印度支那、阿尔及利亚和多数非洲殖民地相继独立；法国同时成为欧盟核心国家，并保留海外省区和海外集体。',
    geography: ['欧盟使莱茵方向从军事边疆转向合作轴线', '海外省区让法国仍跨越加勒比、南美、印度洋和太平洋', '移民与城市郊区把殖民史带回本土社会空间'],
    territory: '本土边界稳定，政治地理转向欧洲一体化和全球海外领土网络。',
    overseas: '瓜德罗普、马提尼克、法属圭亚那、留尼汪、马约特等仍是法国共和国的一部分。',
    places: ['巴黎', '斯特拉斯堡', '法属圭亚那', '留尼汪']
  }
]

const mapLayers = ref({
  roads: true,
  castles: true,
  battles: true,
  rivers: true
})

const activeHotspotId = ref('paris')
const searchQuery = ref('')
const comparisonValue = ref(52)
const isLoading = ref(true)

const mapFrames = [
  {
    id: 'gaul',
    label: '罗马高卢',
    territory: 'M282 168 404 104 558 142 650 244 748 284 792 424 706 568 536 632 380 576 268 448 228 288Z',
    note: '道路与城市先于民族国家出现。'
  },
  {
    id: 'franks',
    label: '法兰克扩张',
    territory: 'M246 150 414 80 630 126 794 236 878 384 810 548 610 646 394 614 232 482 184 290Z',
    note: '巴黎盆地与莱茵方向同时进入政治核心。'
  },
  {
    id: 'capet',
    label: '王室领地扩张',
    territory: 'M348 194 478 150 608 190 706 294 706 438 620 552 488 590 350 516 286 392 294 264Z',
    note: '从巴黎周边向诺曼底、卢瓦尔与阿基坦方向推进。'
  },
  {
    id: 'war',
    label: '近代王国整合',
    territory: 'M252 176 418 112 586 148 734 244 800 392 736 548 560 638 382 588 238 442 202 284Z',
    note: '布列塔尼、勃艮第和南部边疆成为整合重点。'
  },
  {
    id: 'ancien',
    label: '自然边界想象',
    territory: 'M240 154 430 100 642 136 820 262 856 430 760 590 548 660 350 596 204 444 184 268Z',
    note: '莱茵、阿尔卑斯、比利牛斯被纳入边界想象。'
  },
  {
    id: 'revolution',
    label: '革命与帝国',
    territory: 'M214 138 450 68 688 116 908 250 972 430 838 616 562 704 314 622 136 438 130 246Z',
    note: '制度影响越出本土，欧洲大陆成为战争地图。'
  },
  {
    id: 'third',
    label: '殖民帝国',
    territory: 'M246 154 430 98 642 134 828 258 872 422 764 594 548 660 340 590 200 438 184 268Z',
    note: '本土边疆稳定与海外扩张同时发生。'
  },
  {
    id: 'modern',
    label: '现代法国',
    territory: 'M256 154 430 104 626 140 804 260 844 418 746 586 548 650 348 592 210 438 192 270Z',
    note: '共和国边界稳定，但海外领土让法国仍跨越全球。'
  }
]

const hotspots = [
  {
    id: 'paris',
    name: '巴黎',
    x: 506,
    y: 338,
    period: '987 - 至今',
    detail: '巴黎盆地使王权能够沿河流与道路向外整合，后来成为行政、文化与革命政治的核心。'
  },
  {
    id: 'marseille',
    name: '马赛',
    x: 626,
    y: 590,
    period: '古典时代 - 至今',
    detail: '马赛连接地中海贸易、十字军通道、北非联系与现代移民网络，是法国南部门户。'
  },
  {
    id: 'verdun',
    name: '凡尔登',
    x: 662,
    y: 326,
    period: '843 / 1916',
    detail: '凡尔登既让人想到法兰克世界分裂，也代表近现代法德边疆记忆中的战争创伤。'
  },
  {
    id: 'nantes',
    name: '南特',
    x: 346,
    y: 420,
    period: '15 - 18 世纪',
    detail: '南特既关联布列塔尼并入法国，也在大西洋殖民贸易中扮演重要港口角色。'
  }
]

const historicalRoutes = [
  'M310 500 C390 430 462 390 506 338 C558 278 624 236 710 214',
  'M626 590 C580 506 546 420 506 338 C478 286 468 230 486 168',
  'M346 420 C426 418 478 382 506 338 C544 300 596 306 662 326'
]

const castleSites = [
  { x: 388, y: 314 },
  { x: 438, y: 392 },
  { x: 560, y: 278 },
  { x: 704, y: 410 },
  { x: 320, y: 452 }
]

const battleSites = [
  { x: 510, y: 352, label: '巴黎' },
  { x: 662, y: 326, label: '凡尔登' },
  { x: 456, y: 462, label: '卢瓦尔' },
  { x: 596, y: 516, label: '南部边疆' }
]

const dataSeries = [
  { label: '1300', population: 17, economy: 24 },
  { label: '1700', population: 21, economy: 38 },
  { label: '1850', population: 36, economy: 62 },
  { label: '1950', population: 42, economy: 78 },
  { label: '2020', population: 67, economy: 100 }
]

const relationNodes = [
  { name: '路易十四', x: 50, y: 50, type: 'king' },
  { name: '西班牙王室', x: 18, y: 28, type: 'ally' },
  { name: '哈布斯堡', x: 82, y: 30, type: 'rival' },
  { name: '拿破仑', x: 36, y: 78, type: 'emperor' },
  { name: '英国', x: 72, y: 78, type: 'rival' }
]

const relationLinks = [
  [0, 1, '联姻'],
  [0, 2, '竞争'],
  [3, 4, '战争'],
  [3, 2, '重组欧洲'],
  [1, 2, '王朝政治']
]

const geoFeatures = [
  {
    name: '阿尔卑斯与比利牛斯',
    type: '山脉边界',
    detail: '东南和西南山脉帮助形成法国“自然边界”想象，也限制并引导意大利、西班牙方向的军事与贸易通道。'
  },
  {
    name: '塞纳、卢瓦尔、罗讷、加龙',
    type: '河流骨架',
    detail: '河流连接城市、农业腹地和港口，巴黎、里昂、南特、波尔多等城市都依托水系形成长期影响力。'
  },
  {
    name: '大西洋与地中海',
    type: '海洋门户',
    detail: '大西洋推动殖民贸易和移民网络，地中海让法国始终与意大利、北非和东方贸易相连。'
  },
  {
    name: '莱茵走廊',
    type: '边疆轴线',
    detail: '莱茵方向长期连接法德竞争、阿尔萨斯-洛林归属和欧洲一体化，是法国历史地理中最敏感的边疆之一。'
  }
]

const territoryMoments = [
  '987 年卡佩王朝只稳固控制巴黎周边，王室领地随后逐渐外扩。',
  '1532 年布列塔尼并入法国王国，本土西部轮廓更接近现代法国。',
  '17 世纪法国向莱茵、比利牛斯和阿尔卑斯方向推进，形成“自然边界”政治想象。',
  '1763 年七年战争后，法国第一殖民帝国在北美严重收缩。',
  '1830 年征服阿尔及利亚后，第二殖民帝国逐渐扩展到非洲和亚洲。',
  '1962 年阿尔及利亚独立标志法国殖民帝国解体的重要节点。'
]

const sources = [
  { label: 'Roman Gaul', url: 'https://en.wikipedia.org/wiki/Roman_Gaul' },
  { label: 'French colonial empire', url: 'https://en.wikipedia.org/wiki/French_colonial_empire' },
  { label: 'Evolution of the French colonial empire', url: 'https://en.wikipedia.org/wiki/Evolution_of_the_French_colonial_empire' },
  { label: 'Wikimedia Commons', url: 'https://commons.wikimedia.org' }
]

const activeId = ref(periods[0].id)
const activePeriod = computed(() => periods.find((period) => period.id === activeId.value) ?? periods[0])
const activeIndex = computed(() => Math.max(0, periods.findIndex((period) => period.id === activeId.value)))
const activeMapFrame = computed(() => mapFrames[activeIndex.value] ?? mapFrames[0])
const activeHotspot = computed(() => hotspots.find((hotspot) => hotspot.id === activeHotspotId.value) ?? hotspots[0])
const searchResults = computed(() => {
  const keyword = searchQuery.value.trim().toLowerCase()
  if (!keyword) return []

  return periods
    .map((period) => {
      const haystack = [period.range, period.nav, period.title, period.kicker, period.summary, ...period.geography, period.territory, period.overseas, ...period.places]
        .join(' ')
        .toLowerCase()
      return haystack.includes(keyword) ? period : null
    })
    .filter(Boolean)
})

function selectPeriod(id) {
  activeId.value = id
}

function selectPeriodByIndex(index) {
  activeId.value = periods[Number(index)]?.id ?? periods[0].id
}

function toggleLayer(layer) {
  mapLayers.value[layer] = !mapLayers.value[layer]
}

function selectHotspot(id) {
  activeHotspotId.value = id
}

function jumpToResult(id) {
  selectPeriod(id)
  searchQuery.value = ''
}

onMounted(() => {
  window.setTimeout(() => {
    isLoading.value = false
  }, 680)
})
</script>

<template>
  <main class="site-shell">
    <div v-if="isLoading" class="loader" aria-live="polite" aria-label="页面加载中">
      <div class="loader-scroll">
        <span></span>
      </div>
      <p>正在展开历史地图</p>
    </div>

    <section class="hero" :style="{ backgroundImage: `linear-gradient(90deg, rgba(8, 16, 28, .92), rgba(8, 16, 28, .52), rgba(8, 16, 28, .18)), url(${heroImage})` }">
      <div class="hero-copy">
        <p class="overline">Histoire & Geographie</p>
        <h1>法国历史地理长卷</h1>
        <p>
          以地形、河流、边疆和殖民网络为线索，重新观看法国从高卢到第五共和国的版图演变。
        </p>
        <div class="hero-facts" aria-label="页面内容摘要">
          <span>8 个历史阶段</span>
          <span>4 组地理骨架</span>
          <span>本土版图演变</span>
          <span>海外与殖民网络</span>
        </div>
      </div>
    </section>

    <section class="intro-panel">
      <div>
        <p class="overline">Reading map</p>
        <h2>这不是单纯的王朝时间线，而是一张空间如何塑造法国的地图。</h2>
      </div>
      <p>
        巴黎盆地让王权可以向外整合，莱茵方向制造长期边疆焦虑，阿尔卑斯与比利牛斯提供自然屏障，大西洋港口把法国拖入殖民贸易和全球竞争。历史事件在这里被放回地理现场。
      </p>
    </section>

    <section class="search-panel" aria-label="搜索历史主题">
      <div>
        <p class="overline">Search atlas</p>
        <h2>输入地点、战争或时代，直接跳到相关历史阶段。</h2>
      </div>
      <label class="search-box">
        <span>搜索</span>
        <input v-model="searchQuery" type="search" placeholder="例如：百年战争、诺曼底、巴黎、殖民" />
      </label>
      <div v-if="searchResults.length" class="search-results">
        <button v-for="result in searchResults" :key="result.id" type="button" @click="jumpToResult(result.id)">
          <span>{{ result.range }}</span>
          <strong>{{ result.title }}</strong>
        </button>
      </div>
    </section>

    <section class="map-lab" aria-label="交互式历史地图">
      <div class="section-copy">
        <p class="overline">Interactive map</p>
        <h2>拖动时间轴，观察法国空间重心如何移动。</h2>
        <p>
          这张地图不是精确 GIS 边界，而是一张叙事地图：它用领土轮廓、道路、城堡、战役和河流图层，把不同阶段的空间逻辑放在同一个可操作画布里。
        </p>
      </div>

      <div class="map-workbench">
        <div class="map-stage">
          <svg viewBox="0 0 1000 720" role="img" aria-label="法国历史地理交互示意地图">
            <rect width="1000" height="720" class="map-sea" />
            <path class="map-grid-line" d="M120 0V720M240 0V720M360 0V720M480 0V720M600 0V720M720 0V720M840 0V720M0 120H1000M0 240H1000M0 360H1000M0 480H1000M0 600H1000" />
            <path v-if="mapLayers.rivers" class="river river-seine" d="M250 410 C340 380 430 360 506 338 C594 314 680 284 758 214" />
            <path v-if="mapLayers.rivers" class="river river-rhone" d="M586 256 C564 358 594 462 626 590" />
            <path class="territory-shadow" :d="activeMapFrame.territory" />
            <path class="territory-shape" :d="activeMapFrame.territory" />

            <g v-if="mapLayers.roads" class="routes">
              <path v-for="route in historicalRoutes" :key="route" :d="route" />
            </g>

            <g v-if="mapLayers.castles" class="castles">
              <path v-for="site in castleSites" :key="`${site.x}-${site.y}`" :transform="`translate(${site.x} ${site.y})`" d="M-11 10V-7h5v-8h12v8h5v17Z" />
            </g>

            <g v-if="mapLayers.battles" class="battles">
              <g v-for="site in battleSites" :key="site.label" :transform="`translate(${site.x} ${site.y})`">
                <path d="M-10 -10 10 10M10 -10 -10 10" />
                <circle r="15" />
              </g>
            </g>

            <g class="hotspots">
              <g
                v-for="hotspot in hotspots"
                :key="hotspot.id"
                class="hotspot-button"
                role="button"
                tabindex="0"
                :aria-label="hotspot.name"
                @click="selectHotspot(hotspot.id)"
                @keyup.enter="selectHotspot(hotspot.id)"
              >
                <circle :cx="hotspot.x" :cy="hotspot.y" r="12" :class="{ active: activeHotspotId === hotspot.id }" />
                <text :x="hotspot.x + 16" :y="hotspot.y - 14">{{ hotspot.name }}</text>
              </g>
            </g>
          </svg>
        </div>

        <aside class="map-control">
          <div>
            <p class="overline">{{ activeMapFrame.label }}</p>
            <h3>{{ activePeriod.nav }}</h3>
            <p>{{ activeMapFrame.note }}</p>
          </div>
          <label class="time-slider">
            <span>{{ activePeriod.range }}</span>
            <input :value="activeIndex" type="range" min="0" :max="periods.length - 1" step="1" @input="selectPeriodByIndex($event.target.value)" />
          </label>
          <div class="layer-switches" aria-label="地图图层">
            <button type="button" :class="{ active: mapLayers.roads }" @click="toggleLayer('roads')">罗马道路</button>
            <button type="button" :class="{ active: mapLayers.castles }" @click="toggleLayer('castles')">城堡分布</button>
            <button type="button" :class="{ active: mapLayers.battles }" @click="toggleLayer('battles')">战役地点</button>
            <button type="button" :class="{ active: mapLayers.rivers }" @click="toggleLayer('rivers')">河流骨架</button>
          </div>
          <article class="hotspot-card">
            <span>{{ activeHotspot.period }}</span>
            <h3>{{ activeHotspot.name }}</h3>
            <p>{{ activeHotspot.detail }}</p>
          </article>
        </aside>
      </div>
    </section>

    <section class="timeline-section" aria-label="法国历史地理时间线">
      <aside class="timeline-rail">
        <p class="overline">Timeline</p>
        <button
          v-for="period in periods"
          :key="period.id"
          class="timeline-chip"
          :class="{ active: activeId === period.id }"
          type="button"
          @click="selectPeriod(period.id)"
        >
          <span>{{ period.range }}</span>
          <strong>{{ period.nav }}</strong>
        </button>
      </aside>

      <article class="period-card">
        <figure>
          <img :src="activePeriod.image" :alt="activePeriod.imageTitle" />
          <figcaption>
            <span>{{ activePeriod.imageTitle }}</span>
            <a :href="activePeriod.sourceUrl" target="_blank" rel="noreferrer">{{ activePeriod.source }}</a>
          </figcaption>
        </figure>

        <div class="period-body">
          <p class="overline">{{ activePeriod.kicker }}</p>
          <h2>{{ activePeriod.title }}</h2>
          <p class="summary">{{ activePeriod.summary }}</p>

          <div class="evidence-grid">
            <section>
              <h3>地理线索</h3>
              <ul>
                <li v-for="item in activePeriod.geography" :key="item">{{ item }}</li>
              </ul>
            </section>
            <section>
              <h3>版图变化</h3>
              <p>{{ activePeriod.territory }}</p>
            </section>
            <section>
              <h3>海外与殖民</h3>
              <p>{{ activePeriod.overseas }}</p>
            </section>
            <section>
              <h3>关键地点</h3>
              <div class="place-list">
                <span v-for="place in activePeriod.places" :key="place">{{ place }}</span>
              </div>
            </section>
          </div>
        </div>
      </article>
    </section>

    <section class="story-section" aria-label="沉浸式叙事">
      <div class="story-map" aria-hidden="true"></div>
      <article>
        <p class="overline">Immersive scroll</p>
        <h2>从巴黎盆地向外，法国的历史像一圈圈水纹扩散。</h2>
        <p>
          河谷先组织城市，王权随后接管道路和税收，边疆再把军事焦虑写进地图。滚动阅读时，背景地图纹理缓慢移动，模拟翻阅旧地图时视线穿过纸张纤维的感觉。
        </p>
      </article>
      <article>
        <p class="overline">Then and now</p>
        <h2>今昔对比：城市与海岸线的记忆并不在同一张图上。</h2>
        <p>
          下面的滑块用“古地图色块”和“现代地理网格”做对照。它不是卫星图替代品，而是给未来接入真实古地图与现代影像预留的交互模型。
        </p>
      </article>
    </section>

    <section class="compare-section" aria-label="今昔对比滑块">
      <div class="comparison" :style="{ '--split': `${comparisonValue}%` }">
        <div class="compare-pane compare-old">
          <span>18 世纪地图感</span>
        </div>
        <div class="compare-pane compare-now">
          <span>现代地理网格</span>
        </div>
        <input v-model="comparisonValue" type="range" min="8" max="92" aria-label="调整今昔对比比例" />
      </div>
    </section>

    <section class="geography-section">
      <div class="section-copy">
        <p class="overline">Physical geography</p>
        <h2>地理基础：山、河、海与边疆</h2>
        <p>
          法国的历史长期围绕几个地理事实展开：巴黎盆地是政治核心，河流是经济通道，山脉与莱茵方向是边疆，海岸则打开殖民与全球贸易。
        </p>
      </div>
      <div class="geo-layout">
        <img class="geo-image" :src="geographyImage" alt="AI 生成的法国本土地理示意图" />
        <div class="geo-cards">
          <article v-for="feature in geoFeatures" :key="feature.name">
            <span>{{ feature.type }}</span>
            <h3>{{ feature.name }}</h3>
            <p>{{ feature.detail }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="data-section" aria-label="数据可视化与深度探索">
      <div class="section-copy">
        <p class="overline">Data room</p>
        <h2>把地理影响转成可比较的数据与关系。</h2>
        <p>
          这里加入人口、经济和人物关系的轻量可视化，让学生和历史爱好者可以从图像之外继续追问：哪些地区聚集人口，哪些政治关系改变了边界？
        </p>
      </div>
      <div class="data-grid">
        <article class="chart-card">
          <h3>人口与经济重心</h3>
          <div class="bar-chart">
            <div v-for="item in dataSeries" :key="item.label" class="bar-group">
              <span class="bar population" :style="{ height: `${item.population}%` }"></span>
              <span class="bar economy" :style="{ height: `${item.economy}%` }"></span>
              <small>{{ item.label }}</small>
            </div>
          </div>
          <p>蓝色代表人口规模，红色代表经济产出指数。数值用于叙事比较，不替代严肃统计数据。</p>
        </article>
        <article class="network-card">
          <h3>人物与王朝关系</h3>
          <svg viewBox="0 0 100 100" role="img" aria-label="人物关系图谱">
            <g class="network-links">
              <line
                v-for="link in relationLinks"
                :key="link.join('-')"
                :x1="relationNodes[link[0]].x"
                :y1="relationNodes[link[0]].y"
                :x2="relationNodes[link[1]].x"
                :y2="relationNodes[link[1]].y"
              />
            </g>
            <g v-for="node in relationNodes" :key="node.name" class="network-node" :class="node.type">
              <circle :cx="node.x" :cy="node.y" r="5.5" />
              <text :x="node.x" :y="node.y - 8">{{ node.name }}</text>
            </g>
          </svg>
        </article>
      </div>
    </section>

    <section class="territory-section">
      <div class="territory-visual" :style="{ backgroundImage: `linear-gradient(180deg, rgba(10, 18, 31, .2), rgba(10, 18, 31, .86)), url(${colonialRoutesImage})` }">
        <div>
          <p class="overline">Territory atlas</p>
          <h2>从王室领地到殖民帝国，再到现代海外法国</h2>
        </div>
      </div>
      <div class="territory-content">
        <ol class="territory-list">
          <li v-for="moment in territoryMoments" :key="moment">{{ moment }}</li>
        </ol>
        <figure class="territory-map">
          <img src="/assets/history/colonial-empire.png" alt="法国殖民帝国地图" />
          <figcaption>
            <span>法国殖民帝国地图</span>
            <a href="https://commons.wikimedia.org/wiki/Special:FilePath/EmpireFrench.png" target="_blank" rel="noreferrer">Wikimedia Commons</a>
          </figcaption>
        </figure>
      </div>
    </section>

    <section class="archive-section">
      <div class="section-copy">
        <p class="overline">Image archive</p>
        <h2>图像档案与资料来源</h2>
      </div>
      <div class="archive-grid">
        <a v-for="period in periods" :key="period.id" :href="period.sourceUrl" target="_blank" rel="noreferrer">
          <img :src="period.image" :alt="period.imageTitle" />
          <span>{{ period.range }}</span>
          <strong>{{ period.imageTitle }}</strong>
        </a>
      </div>
      <div class="source-list">
        <a v-for="source in sources" :key="source.url" :href="source.url" target="_blank" rel="noreferrer">
          {{ source.label }}
        </a>
      </div>
    </section>
  </main>
</template>
