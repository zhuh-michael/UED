package com.qingluan.orgmanager.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import java.util.List;

/**
 * 部门树形节点 DTO
 * 用于前端树形展示
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DepartmentNode {
    
    private Long id;
    private String name;
    private String code;
    
    @JsonProperty("parentId")
    private Long parentId;
    
    private Integer level;
    private Integer sortOrder;
    private Short status;
    private String description;
    private String leader;
    private Integer memberCount;
    private Boolean hasChildren;
    private List<DepartmentNode> children;
}
