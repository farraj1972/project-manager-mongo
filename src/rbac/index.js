const rbac = {

    profiles:[
        'ADMIN',
        'PROJECT_MANAGER',
        'TEAM_LEADER',
        'TEAM_MEMBER'
    ],

    permissions:{
        'ADMIN':[
            'permission.ALL'
        ],
        'PROJECT_MANAGER'   :[
            'project.CREATE',
            'project.RETRIEVE',
            'project.UPDATE',
            'project.DELETE',
            'task.RETRIEVE'
        ],
        'TEAM_LEADER'   :[
            'task.CREATE',
            'task.RETRIEVE',
            'task.UPDATE',
            'task.DELETE',
            'project.RETRIEVE'
        ],   
        'TEAM_MEMBER'   :[
            'task.RETRIEVE',
            'task.UPDATE',
            'project.RETRIEVE'
        ]                 
    }
}
module.exports = rbac;