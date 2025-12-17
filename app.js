// 小六壬 · Lumi Free — emoji only
// 起课逻辑：用 24 小时制 hour % 6
// 0 空亡, 1 大安, 2 留连, 3 速喜, 4 赤口, 5 小吉

const LIUSHEN = [
  { key: "空亡", emoji: "⚫", core: "暂空", one: "此刻无果，换时机" },
  { key: "大安", emoji: "🟢", core: "稳定", one: "守得住就会成" },
  { key: "留连", emoji: "🟡", core: "拖延", one: "未到时机，先观察" },
  { key: "速喜", emoji: "✨", core: "推进", one: "好消息在路上" },
  { key: "赤口", emoji: "🔴", core: "冲突", one: "少说少碰，先缓" },
  { key: "小吉", emoji: "🟢", core: "小成", one: "不大，但稳" },
];

const TOPICS = [
  { id: "general", label: "🧭 总体" },
  { id: "love", label: "💕 感情" },
  { id: "work", label: "🧑‍💼 工作" },
  { id: "money", label: "💰 财务" },
  { id: "people", label: "💬 人际" },
  { id: "move", label: "🚶 出行" },
  { id: "study", label: "📚 学业" },
];

const EXPLAIN = {
  "大安": {
    core: ["稳定、安全、可守", "适合：守、整理、落实", "不急，稳扎稳打更快。"],
    tags: ["守", "稳", "慢"],
    byTopic: {
      general: "整体在正轨上。先把眼前做好，别乱改方向。",
      love: "关系偏稳定。适合日常关心、慢慢推进，不要硬逼表态。",
      work: "流程顺，适合执行、交付、补细节。守住节奏就有成果。",
      money: "偏保守为佳。先控支出、做预算；大动作可缓一缓。",
      people: "气氛平稳。适合讲清楚、定规则、慢慢建立信任。",
      move: "可行但别赶。提早规划，稳稳走更安全。",
      study: "适合打基础、复习、按部就班。靠累积见效。",
    }
  },
  "留连": {
    core: ["拖延、反复、未明朗", "适合：观察、等时机", "强推只会更慢。"],
    tags: ["等", "看", "别急"],
    byTopic: {
      general: "事情卡在中间，不是失败，是“还没到”。先观察再动。",
      love: "暧昧/犹豫期常见。别追问到对方压力爆表；给空间更有效。",
      work: "流程拖、对接慢。先补齐资料与备选方案，等关键点落地。",
      money: "款项/回报延迟。先稳住现金流，不要追高或冲动。",
      people: "立场不清、信息不全。先确认事实，别凭感觉下结论。",
      move: "行程可能变动。先留缓冲、备方案。",
      study: "效率忽高忽低。先整理方法与环境，稳定节奏再冲。",
    }
  },
  "速喜": {
    core: ["顺、快、有回应", "适合：推进、沟通、提交", "把握当下顺势。"],
    tags: ["动", "说", "推进"],
    byTopic: {
      general: "好消息在路上。现在行动更容易得到回应与助力。",
      love: "适合表达、邀约、推进关系。轻松一点，更有甜感。",
      work: "适合提案、面试、交付、谈合作。快进快出更吃香。",
      money: "有小利或进账机会。适合做“合理的推进”，别贪大。",
      people: "沟通顺，容易谈成。把重点说清楚就好。",
      move: "出行顺畅。适合当机立断订票/安排。",
      study: "状态在线。适合冲刺、考试、输出成果。",
    }
  },
  "赤口": {
    core: ["误会、冲突、情绪碰撞", "适合：缓、避锋芒", "少说少碰，先冷静。"],
    tags: ["避", "缓", "少说"],
    byTopic: {
      general: "此刻容易“说错一句就炸”。先缓一缓，别硬碰硬。",
      love: "别用质问/翻旧账。先降温、换个方式沟通更有效。",
      work: "谈判/争论不利。先写清楚要点，避免情绪对话。",
      money: "冲动消费/冲动决策风险高。先停一下，明天再看。",
      people: "易误会、易口舌。能不回就晚点回，避免扩大。",
      move: "路上可能烦躁或小摩擦。提早出门、别急。",
      study: "心浮气躁。先做简单题/复习，别硬啃难点。",
    }
  },
  "小吉": {
    core: ["小收获、稳中有进", "适合：按部就班", "不大突破，但可成。"],
    tags: ["顺", "平", "可行"],
    byTopic: {
      general: "小步快跑就会有进展。别嫌小，稳稳累积更香。",
      love: "适合日常互动、培养默契。别急着定终局。",
      work: "小项目/小任务容易完成。先拿下确定的分数。",
      money: "有小利但别幻想暴富。适合稳健规划与节制。",
      people: "关系可修复、可缓和。用轻松的方式更顺。",
      move: "可行，过程平稳。按计划走就好。",
      study: "适合刷题、练习、输出小成果。稳定就会进步。",
    }
  },
  "空亡": {
    core: ["暂时无回应、落空、时机未成", "适合：放下、换时机", "不是没未来，是现在问不到。"],
    tags: ["放", "停", "换时机"],
    byTopic: {
      general: "此刻信息不在你手上。先停一下，转做别的更有效。",
      love: "别用力拉扯。越逼越空。先回到自己节奏。",
      work: "关键资源未到位。先做准备动作，别硬冲核心点。",
      money: "不利重决策。先保守、先留现金，等更清晰再动。",
      people: "对方可能不在状态/不想回应。别追，先放。",
      move: "不建议临时赶变动。先确认再走。",
      study: "脑子空转。先休息/换任务，恢复状态再学。",
    }
  },
};

let currentTopic = "general";
let currentResult = null;

const $ = (id) => document.getElementById(id);

function formatNow() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function castByNow() {
  const d = new Date();
  const hour = d.getHours(); // 0-23
  const idx = hour % 6;      // 0..5
  return { hour, idx, ts: formatNow(), liu: LIUSHEN[idx] };
}

function renderTopics() {
  const wrap = $("topicChips");
  wrap.innerHTML = "";
  TOPICS.forEach(t => {
    const btn = document.createElement("button");
    btn.className = "chip" + (t.id === currentTopic ? " active" : "");
    btn.type = "button";
    btn.textContent = t.label;
    btn.addEventListener("click", () => {
      currentTopic = t.id;
      renderTopics();
      renderTopicPanel();
      renderExplain();
    });
    wrap.appendChild(btn);
  });
}

function renderTopicPanel() {
  const panel = $("topicPanel");
  if (!currentResult) {
    panel.innerHTML = `<div class="muted">先 ✨ 起课，然后选择主题，会显示该主题下的解读。</div>`;
    return;
  }
  const name = currentResult.liu.key;
  const topicText = EXPLAIN[name]?.byTopic?.[currentTopic] ?? "（此主题暂无扩展）";
  panel.innerHTML = `
    <div><b>当前结果：</b>${currentResult.liu.emoji} ${name}</div>
    <div class="muted" style="margin-top:6px;">主题：${TOPICS.find(t=>t.id===currentTopic)?.label ?? ""}</div>
    <div style="margin-top:10px; line-height:1.65;">${topicText}</div>
  `;
}

function renderExplain() {
  const box = $("fullExplain");
  if (!currentResult) {
    box.innerHTML = `<div class="muted">先起课，我才显示对应的完整解释。</div>`;
    return;
  }
  const name = currentResult.liu.key;
  const data = EXPLAIN[name];
  const lines = data?.core ?? [];
  const tags = data?.tags ?? [];
  const topicText = data?.byTopic?.[currentTopic] ?? "";

  box.innerHTML = `
    <div class="block">
      <div class="h">${currentResult.liu.emoji} ${name}｜${currentResult.liu.core}</div>
      <div class="p">${lines.map(l=>`• ${l}`).join("<br>")}</div>
      <div class="tagrow">${tags.map(t=>`<span class="tag">#${t}</span>`).join("")}</div>
    </div>

    <div class="block">
      <div class="h">🧩 主题解读：${TOPICS.find(t=>t.id===currentTopic)?.label ?? ""}</div>
      <div class="p">${topicText}</div>
    </div>

    <div class="muted">📌 提醒：这是“当下倾向”。若你已做决定，就别再反复起课。</div>
  `;
}

function renderHeader() {
  if (!currentResult) return;
  $("timeLabel").textContent = currentResult.ts;
  $("hourLabel").textContent = String(currentResult.hour);
  $("resultLabel").textContent = `${currentResult.liu.emoji} ${currentResult.liu.key}`;
}

function doCast() {
  currentResult = castByNow();
  renderHeader();
  renderTopicPanel();
  renderExplain();
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("lumi_theme", theme);
}
function toggleTheme() {
  const cur = document.documentElement.getAttribute("data-theme") || "dark";
  applyTheme(cur === "dark" ? "light" : "dark");
}

(function init(){
  const saved = localStorage.getItem("lumi_theme");
  applyTheme(saved || "dark");

  renderTopics();

  $("btnCast").addEventListener("click", doCast);
  $("btnNow").addEventListener("click", doCast);
  $("btnTheme").addEventListener("click", toggleTheme);

  // 默认显示当前时间但不自动起课（避免用户没问就被“算”）
  $("timeLabel").textContent = formatNow();
})();
