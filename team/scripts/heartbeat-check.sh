#!/bin/bash
# 祖龙心跳检查脚本
# 功能：定期检查团队成员状态，更新看板，主动汇报

WORKSPACE="/root/.openclaw/workspace-manager"
KANBAN="$WORKSPACE/team/kanban.md"
CONTACT_LOG="$WORKSPACE/team/contact_log.md"
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

echo "[$TIMESTAMP] 祖龙心跳检查启动..."

# 检查成员记忆文件是否存在并更新
for member in qingluan qilin baize chongming; do
    MEMBER_FILE="$WORKSPACE/team/members/${member}.md"
    if [ -f "$MEMBER_FILE" ]; then
        echo "✅ $member 记忆文件存在"
    else
        echo "⚠️ $member 记忆文件缺失"
    fi
done

# 更新看板时间戳
sed -i "s/\*\*最后更新\*\*: .*/\*\*最后更新\*\*: $(date '+%Y-%m-%d %H:%M')/" "$KANBAN"

echo "[$TIMESTAMP] 看板已更新"
echo "[$TIMESTAMP] 心跳检查完成"
