var p = Ent.Project.create('boss', 'js');
p.setVersion(1, 2, 0);
p.setBolt('library', '**/*.js');
p.setBoltTest();
