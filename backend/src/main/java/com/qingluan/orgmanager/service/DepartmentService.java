package com.qingluan.orgmanager.service;

import com.qingluan.orgmanager.dto.DepartmentNode;
import com.qingluan.orgmanager.entity.Department;
import com.qingluan.orgmanager.repository.DepartmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * 部门服务类
 * 处理部门树形结构转换等业务逻辑
 */
@Service
@RequiredArgsConstructor
public class DepartmentService {

    private final DepartmentRepository departmentRepository;

    /**
     * 更新部门（包括 parentId）
     * 
     * @param id 部门 ID
     * @param node 更新数据
     * @return 更新后的部门
     */
    @Transactional
    public Department updateDepartment(Long id, DepartmentNode node) {
        Department existing = departmentRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("部门不存在"));
        
        // 设置 parent（通过 parentId）
        if (node.getParentId() != null) {
            Department parent = departmentRepository.findById(node.getParentId())
                .orElseThrow(() -> new RuntimeException("父部门不存在"));
            existing.setParent(parent);
        } else {
            existing.setParent(null);
        }
        
        existing.setName(node.getName());
        existing.setCode(node.getCode());
        existing.setLevel(node.getLevel());
        existing.setSortOrder(node.getSortOrder());
        existing.setStatus(node.getStatus());
        existing.setDescription(node.getDescription());
        
        return departmentRepository.saveAndFlush(existing);
    }

    /**
     * 获取部门树形结构
     * 将平级部门列表转换为树形结构
     * 
     * @return 树形部门列表
     */
    public List<DepartmentNode> getDepartmentTree() {
        // 获取所有活跃部门
        List<Department> allDepartments = departmentRepository.findAllActive();
        
        if (allDepartments.isEmpty()) {
            return new ArrayList<>();
        }

        // 构建 ID 到 Department 的映射
        Map<Long, Department> deptMap = allDepartments.stream()
            .collect(Collectors.toMap(Department::getId, dept -> dept));

        // 构建 ID 到 DepartmentNode 的映射
        Map<Long, DepartmentNode> nodeMap = allDepartments.stream()
            .map(this::convertToNode)
            .collect(Collectors.toMap(DepartmentNode::getId, node -> node));

        // 构建树形结构
        List<DepartmentNode> rootNodes = new ArrayList<>();
        
        for (DepartmentNode node : nodeMap.values()) {
            if (node.getParentId() == null) {
                // 根节点
                rootNodes.add(node);
            } else {
                // 子节点，添加到父节点的 children
                DepartmentNode parentNode = nodeMap.get(node.getParentId());
                if (parentNode != null) {
                    if (parentNode.getChildren() == null) {
                        parentNode.setChildren(new ArrayList<>());
                    }
                    parentNode.getChildren().add(node);
                    parentNode.setHasChildren(true);
                }
            }
        }

        // 计算层级和 hasChildren
        calculateLevelsAndChildren(rootNodes, 1);

        return rootNodes;
    }

    /**
     * 递归计算层级和 hasChildren 标志
     */
    private void calculateLevelsAndChildren(List<DepartmentNode> nodes, int level) {
        if (nodes == null || nodes.isEmpty()) {
            return;
        }

        for (DepartmentNode node : nodes) {
            node.setLevel(level);
            
            if (node.getChildren() != null && !node.getChildren().isEmpty()) {
                node.setHasChildren(true);
                // 递归处理子节点
                calculateLevelsAndChildren(node.getChildren(), level + 1);
            } else {
                node.setHasChildren(false);
                node.setChildren(null); // 确保没有 children 时设为 null
            }
        }
    }

    /**
     * 将 Department 实体转换为 DepartmentNode DTO
     */
    private DepartmentNode convertToNode(Department dept) {
        DepartmentNode node = new DepartmentNode();
        node.setId(dept.getId());
        node.setName(dept.getName());
        node.setCode(dept.getCode());
        node.setParentId(dept.getParent() != null ? dept.getParent().getId() : null);
        node.setLevel(dept.getLevel());
        node.setSortOrder(dept.getSortOrder());
        node.setStatus(dept.getStatus());
        node.setDescription(dept.getDescription());
        node.setHasChildren(false);
        node.setChildren(new ArrayList<>());
        return node;
    }
}
