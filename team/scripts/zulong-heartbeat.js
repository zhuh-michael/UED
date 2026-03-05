#!/usr/bin/env node
/**
 * 祖龙心跳守护进程
 * 功能：定时检查团队成员状态，主动汇报
 * 运行方式：node zulong-heartbeat.js &
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const WORKSPACE = '/root/.openclaw/workspace-manager';
const LOG_FILE = path.join(WORKSPACE, 'logs', 'heartbeat-daemon.log');
const KANBAN_FILE = path.join(WORKSPACE, 'team', 'kanban.md');
const CONTACT_LOG = path.join(WORKSPACE, 'team', 'contact_log.md');

function log(message) {
    const timestamp = new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' });
    const logLine = `[${timestamp}] ${message}\n`;
    console.log(logLine.trim());
    fs.appendFileSync(LOG_FILE, logLine);
}

function updateKanban() {
    const now = new Date();
    const timestamp = now.toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' });
    const dateStr = now.toISOString().slice(0, 10);
    const timeStr = now.toTimeString().slice(0, 5);
    
    try {
        let content = fs.readFileSync(KANBAN_FILE, 'utf8');
        content = content.replace(
            /\*\*最后更新\*\*: .*/,
            `**最后更新**: ${dateStr} ${timeStr}`
        );
        fs.writeFileSync(KANBAN_FILE, content);
        log('✅ 看板已更新');
        return true;
    } catch (err) {
        log(`❌ 看板更新失败：${err.message}`);
        return false;
    }
}

function checkMembers() {
    const members = ['qingluan', 'qilin', 'baize', 'chongming'];
    const results = [];
    
    members.forEach(member => {
        const memberFile = path.join(WORKSPACE, 'team', 'members', `${member}.md`);
        const exists = fs.existsSync(memberFile);
        results.push({ name: member, status: exists ? '✅' : '❌' });
        log(`${exists ? '✅' : '❌'} ${member} 记忆文件${exists ? '存在' : '缺失'}`);
    });
    
    return results;
}

function runHeartbeat() {
    log('━━━ 祖龙心跳检查启动 ━━━');
    checkMembers();
    updateKanban();
    log('━━━ 心跳检查完成 ━━━\n');
}

// 立即执行一次
runHeartbeat();

// 每 10 分钟检查一次
setInterval(() => {
    runHeartbeat();
}, 10 * 60 * 1000);

log('🐉 祖龙心跳守护进程已启动 (每 10 分钟检查一次)');
