package mvc.model;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="Lists")
public class ToDoList {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "list_id", unique = true, nullable = false)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @OneToMany(mappedBy="list", fetch=FetchType.EAGER, orphanRemoval=true, cascade={CascadeType.ALL})
    private List<ToDoTask> tasks;

    public Long getId() {
        return id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public List<ToDoTask> getTasks() {
        return tasks;
    }
}
