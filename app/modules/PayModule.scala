package modules

import com.google.inject.AbstractModule
import services.{SimpleUUIDGenerator, UUIDGenerator}

/**
 * Created by akoiro on 9/11/15.
 */
class PayModule extends AbstractModule {
  override def configure(): Unit = {
    bind(classOf[UUIDGenerator]).to(classOf[SimpleUUIDGenerator])
  }
}
