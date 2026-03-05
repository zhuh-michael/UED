-- 🦄 白泽 - 部门树形展示功能测试数据
-- 执行方式：psql -d qingluan_org_manager -f department-test-data.sql

-- 清空现有部门数据（测试环境使用）
-- DELETE FROM departments;

-- 重置序列
-- ALTER SEQUENCE departments_id_seq RESTART WITH 1;

-- ============================================
-- 标准测试数据集（15 个部门，4 个层级）
-- ============================================

-- L1: 总公司
INSERT INTO departments (name, code, parent_id, level, sort_order, status, description)
VALUES ('总公司', 'HQ', NULL, 1, 0, 1, '公司总部');

-- L2: 一级部门
INSERT INTO departments (name, code, parent_id, level, sort_order, status, description)
VALUES 
('研发中心', 'RDC', 1, 2, 1, 1, '负责技术研发'),
('产品中心', 'PDC', 1, 2, 2, 1, '负责产品规划'),
('运营中心', 'ODC', 1, 2, 3, 1, '负责业务运营'),
('职能中心', 'FDC', 1, 2, 4, 1, '负责职能支持');

-- L3: 二级部门（研发中心下属）
INSERT INTO departments (name, code, parent_id, level, sort_order, status, description)
VALUES 
('前端部', 'FE', 2, 3, 1, 1, '前端开发团队'),
('后端部', 'BE', 2, 3, 2, 1, '后端开发团队'),
('测试部', 'QA', 2, 3, 3, 1, '质量保证团队');

-- L3: 二级部门（产品中心下属）
INSERT INTO departments (name, code, parent_id, level, sort_order, status, description)
VALUES 
('产品一部', 'PD1', 3, 3, 1, 1, '产品线 1'),
('产品二部', 'PD2', 3, 3, 2, 1, '产品线 2');

-- L3: 二级部门（职能中心下属）
INSERT INTO departments (name, code, parent_id, level, sort_order, status, description)
VALUES 
('人力资源部', 'HR', 5, 3, 1, 1, '人力资源管理'),
('财务部', 'FIN', 5, 3, 2, 1, '财务管理'),
('行政部', 'ADM', 5, 3, 3, 1, '行政管理');

-- L4: 三级部门（前端部下属）
INSERT INTO departments (name, code, parent_id, level, sort_order, status, description)
VALUES 
('前端一组', 'FE1', 6, 4, 1, 1, '前端开发一组'),
('前端二组', 'FE2', 6, 4, 2, 1, '前端开发二组');

-- ============================================
-- 边界测试数据集 - 深层级链（12 层级）
-- ============================================

INSERT INTO departments (name, code, parent_id, level, sort_order, status, description)
VALUES 
('L1-根', 'L1-ROOT', NULL, 1, 100, 1, '深层级测试根节点'),
('L2-A', 'L2-A', 16, 2, 1, 1, '深层级测试 L2'),
('L3-B', 'L3-B', 17, 3, 1, 1, '深层级测试 L3'),
('L4-C', 'L4-C', 18, 4, 1, 1, '深层级测试 L4'),
('L5-D', 'L5-D', 19, 5, 1, 1, '深层级测试 L5'),
('L6-E', 'L6-E', 20, 6, 1, 1, '深层级测试 L6'),
('L7-F', 'L7-F', 21, 7, 1, 1, '深层级测试 L7'),
('L8-G', 'L8-G', 22, 8, 1, 1, '深层级测试 L8'),
('L9-H', 'L9-H', 23, 9, 1, 1, '深层级测试 L9'),
('L10-I', 'L10-I', 24, 10, 1, 1, '深层级测试 L10'),
('L11-J', 'L11-J', 25, 11, 1, 1, '深层级测试 L11'),
('L12-K', 'L12-K', 26, 12, 1, 1, '深层级测试 L12');

-- ============================================
-- 边界测试数据集 - 禁用状态部门
-- ============================================

INSERT INTO departments (name, code, parent_id, level, sort_order, status, description)
VALUES 
('已禁用部门', 'DISABLED', 1, 2, 99, 0, '用于测试禁用状态显示');

-- ============================================
-- 验证查询
-- ============================================

-- 查看部门树结构
SELECT 
    id,
    name,
    code,
    parent_id,
    level,
    CASE WHEN status = 1 THEN '启用' ELSE '禁用' END as status_text,
    REPEAT('  ', level - 1) || name as tree_view
FROM departments
ORDER BY level, sort_order, id;

-- 统计各层级部门数量
SELECT level, COUNT(*) as count
FROM departments
GROUP BY level
ORDER BY level;

-- 查看部门总数
SELECT COUNT(*) as total_departments FROM departments;
