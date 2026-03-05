-- V2__init_data.sql
-- 青鸾组织架构管理系统 - 初始化数据

-- 初始化角色
INSERT INTO roles (name, code, description, is_system, status) VALUES
('超级管理员', 'ROLE_ADMIN', '系统超级管理员，拥有所有权限', TRUE, 1),
('普通用户', 'ROLE_USER', '普通用户，基础权限', TRUE, 1),
('部门经理', 'ROLE_MANAGER', '部门经理，管理本部门员工', FALSE, 1),
('HR 管理员', 'ROLE_HR', '人力资源管理员，管理员工信息', FALSE, 1);

-- 初始化权限
INSERT INTO permissions (name, code, type, resource, action, status) VALUES
-- 部门权限
('查看部门', 'department:read', 'api', 'department', 'read', 1),
('创建部门', 'department:create', 'api', 'department', 'create', 1),
('编辑部门', 'department:update', 'api', 'department', 'update', 1),
('删除部门', 'department:delete', 'api', 'department', 'delete', 1),
-- 岗位权限
('查看岗位', 'position:read', 'api', 'position', 'read', 1),
('创建岗位', 'position:create', 'api', 'position', 'create', 1),
('编辑岗位', 'position:update', 'api', 'position', 'update', 1),
('删除岗位', 'position:delete', 'api', 'position', 'delete', 1),
-- 员工权限
('查看员工', 'employee:read', 'api', 'employee', 'read', 1),
('创建员工', 'employee:create', 'api', 'employee', 'create', 1),
('编辑员工', 'employee:update', 'api', 'employee', 'update', 1),
('删除员工', 'employee:delete', 'api', 'employee', 'delete', 1),
-- 用户权限
('查看用户', 'user:read', 'api', 'user', 'read', 1),
('创建用户', 'user:create', 'api', 'user', 'create', 1),
('编辑用户', 'user:update', 'api', 'user', 'update', 1),
('删除用户', 'user:delete', 'api', 'user', 'delete', 1),
-- 角色权限
('查看角色', 'role:read', 'api', 'role', 'read', 1),
('创建角色', 'role:create', 'api', 'role', 'create', 1),
('编辑角色', 'role:update', 'api', 'role', 'update', 1),
('删除角色', 'role:delete', 'api', 'role', 'delete', 1),
-- 权限管理
('查看权限', 'permission:read', 'api', 'permission', 'read', 1),
('分配权限', 'permission:assign', 'api', 'permission', 'assign', 1);

-- 给超级管理员分配所有权限
INSERT INTO role_permissions (role_id, permission_id)
SELECT 1, id FROM permissions;

-- 给普通用户分配基础查看权限
INSERT INTO role_permissions (role_id, permission_id)
SELECT 2, id FROM permissions WHERE action = 'read';

-- 创建管理员用户（密码：admin123，BCrypt 加密）
INSERT INTO employees (employee_no, name, gender, email, status) 
VALUES ('ADMIN001', '系统管理员', 0, 'admin@qingluan.com', 1);

INSERT INTO users (username, password_hash, employee_id, email, status) 
VALUES ('admin', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVKIUi', 1, 'admin@qingluan.com', 1);

-- 关联管理员角色
INSERT INTO user_roles (user_id, role_id) VALUES (1, 1);
