// changelog配置，commit 规则也在这里进行配置
// 参考文档：https://www.npmjs.com/package/git-cz

module.exports = {
    disableEmoji: false,
    list: ['test', 'feat', 'fix', 'chore', 'docs', 'refactor', 'style', 'ci', 'perf'],
    maxMessageLength: 64,
    minMessageLength: 3,
    questions: ['type', 'scope', 'subject', 'body', 'breaking', 'issues', 'lerna'],
    scopes: [],
    // 翻译了一下描述部分
    types: {
        chore: {
            description:
                '跟仓库主要业务无关的构建/工程依赖/工具等功能改动（比如新增一个文档生成工具）',
            value: 'chore'
        },
        ci: {
            description: 'CI related changes',
            value: 'ci'
        },
        docs: {
            description: '更新了文档（比如改了 Readme）',
            value: 'docs'
        },
        feat: {
            description: '一个新的特性',
            value: 'feat'
        },
        fix: {
            description: '修复bug',
            value: 'fix'
        },
        perf: {
            description: '优化了性能的代码改动',
            value: 'perf'
        },
        refactor: {
            description: '一些代码结构上优化，既不是新特性也不是修 Bug（比如函数改个名字）',
            value: 'refactor'
        },
        release: {
            description: 'Create a release commit',
            value: 'release'
        },
        style: {
            description: '代码的样式美化，不涉及到功能修改（比如改了缩进）',
            value: 'style'
        },
        test: {
            description: '新增或者修改已有的测试代码',
            value: 'test'
        }
    }
};
